/**
 * Created by JasonChou on 17/8/10.
 */

const wx = require('./wx');
const md5 = require('./md5.min');
const {getUploadToken} = require('../apis');

let tokenCache;

const url = 'https://upload.qiniup.com';

function upload({filePath, token, key}) {
    return wx.uploadFile({
        url,
        name: 'file',
        filePath,
        formData: {
            token,
            key
        }
    }).then(res => {

        return res;
    })
}

module.exports.upload = upload;

module.exports.wsdkUpload = function ({filePaths}) {

    let index = -1;

    if (!filePaths || !filePaths.length) {
        return new wx.Promise((resolve, reject) => {
            return resolve([])
        })
    }

    return new wx.Promise((resolve, reject) => {
        const keys = [];
        const uploadNext = function (token) {
            index++;
            if (index >= filePaths.length) {
                return resolve(keys);
            }

            const filePath = filePaths[index];

            wx.getImageInfo({src: filePath}).then(({width, height}) => {

                let key = md5(filePath.split('//')[1]) + `_${width}X${height}`;

                console.log('key', key);
                // uploadNext();
                upload({filePath, token, key}).then(res => {
                    console.log('qiniu', res);

                    keys.push(key);
                    uploadNext(token)
                }).catch(res => {
                    reject();
                })
            }).catch(res => {
                reject();
            });
        };

        if (!tokenCache || Date.now() - tokenCache.time > 1000 * 60 * 5)
            getUploadToken().then(res => {
                const token = res.data.data.token;
                tokenCache = {
                    time: Date.now(),
                    value: token
                };
                uploadNext(token);
            }).catch(res => {
                reject();
            });
        else {
            const token = tokenCache.value;
            uploadNext(token);
        }
    });
};

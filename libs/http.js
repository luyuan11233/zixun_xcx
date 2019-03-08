/**
 * Created by JasonChou on 17/7/7.
 */
const wx = require('../libs/wx');
const http = {};
const defaultHost = 'https://api.wenshendaka.com';
// const defaultHost = 'https://api.dev.wenshendaka.com';
const header = {};

header['content-type'] = 'application/x-www-form-urlencoded';

['get', 'post', 'delete', 'put'].map(method => {
    http[method] = (options) => {
        options['url'] = defaultHost + options['url'];
        options['method'] = method.toUpperCase();
        options['header'] = header;
        if (wx.getStorageSync('cookie')) {
            options['header']['cookie'] = wx.getStorageSync('cookie')
        }
        return wx.request(options).then((res) => {
            if (res.header['Set-Cookie']) {
                wx.setStorageSync('cookie', res.header['Set-Cookie'].split(';')[0])
            }
            console.log('succ', res.data.data)
            return res;
        }).catch((res) => {
            console.log('fail', res)
            if(res.data.msg){
                let msg = res.data.msg;
                if(res.data.msg != 'zh_cn:LOGIN_OVERDUE'){
                    wx.showToast({
                        title:msg,
                        icon: 'none',
                    })
                }
            }
            wx.hideNavigationBarLoading()
            return res;
        });
    }
});
module.exports = http;
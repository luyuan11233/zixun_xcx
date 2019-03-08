/**
 * Created by JasonChou on 17/7/14.
 */
const wx = require('./wx');
module.exports = (options) => {
    override(options, 'onLoad', (options.setTitle || function () {
        // wx.setNavigationBarTitle({title:''})
    }));

    Page(options)
};


function override(obj, method, inject) {
    if (!obj[method]) {
        obj[method] = () => {

        }
    }

    const func = obj[method];
    obj[method] = function (q) {
        inject();
        func.call(this, q);
    }
}
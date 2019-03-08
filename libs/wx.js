class Promise {
    constructor(cb) {
        this.succ = [];
        this.fails = [];
        cb(this.success.bind(this), this.fail.bind(this));
    }

    success() {
        this.last = arguments;
        this.succ.map((cb) => {
            const res = cb(...this.last);
            this.last = [res];
        })
        this.end = true;
    }

    fail() {
        this.last = arguments;

        this.fails.map((cb) => {
            const res = cb(...this.last);
            this.last = [res];
        })

        this.end = true;
    }

    then(cb) {
        if (this.end) {
            const res = cb(...this.last);
            this.last = [res];
        } else {
            this.succ.push(cb);
        }
        return this;
    }

    catch(cb) {
        if (this.end) {
            const res = cb(...this.last);
            this.last = [res];
        } else {
            this.fails.push(cb);
        }
        return this;
    }
}


module.exports = {
    Promise,
    getAccountInfoSync() {
        return wx.getAccountInfoSync()
    },
    login(options = {}) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.login(options);
        })
    },

    showToast(options = {}) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.showToast(options);
        })
    },

    navigateToMiniProgram(options = {}) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.navigateToMiniProgram(options);
        })
    },

    chooseImage(options = {}) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.chooseImage(options);
        })
    },

    getUserInfo(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.getUserInfo(options);
        })
    },
    getSetting(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.getSetting(options);
        })
    },
    getImageInfo(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.getImageInfo(options);
        })
    },

    showLoading(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.showLoading(options);
        })
    },
    hideLoading() {
        setTimeout(() => {
            wx.hideLoading();
        }, 300)
    },
    stopPullDownRefresh() {
        wx.stopPullDownRefresh();
    },
    navigateBack(options) {
        wx.navigateBack(options);
    },
    showNavigationBarLoading() {
        wx.showNavigationBarLoading();
    },

    hideNavigationBarLoading() {
        wx.hideNavigationBarLoading();
    },

    uploadFile(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.uploadFile(options);
        })
    },

    request(options) {
        return new Promise((success, fail) => {
            options.success = (res) => {
                if (res.statusCode === 200) {
                    success(res)
                } else {
                    fail(res);
                }
            };
            options.fail = () => {
                fail({
                    statusCode: 1000, data: {
                        code: 1000,
                        msg: '网络异常，请检查您的网络！'
                    }
                });
            };
            wx.request(options);
        })
    },
    getLocation(object) {
        return wx.getLocation(object);
    },
    getStorageSync(key) {
        return wx.getStorageSync(key);
    },

    setStorageSync(key, value) {
        wx.setStorageSync(key, value);
    },

    setNavigationBarTitle(options) {
        wx.setNavigationBarTitle(options)
    },
    pageScrollTo(options){
        return wx.pageScrollTo(options)
    },
    createAnimation(options) {
        return wx.createAnimation(options)
    },

    previewImage(options) {
        wx.previewImage(options)
    },

    hideNavigationBarLoading() {
        wx.hideNavigationBarLoading()
    },

    navigateTo(o) {
        wx.navigateTo(o)
    },
    reLaunch(o) {
        wx.reLaunch(o)
    },
    redirectTo(o) {
        wx.redirectTo(o)
    },
    switchTab(o) {
        wx.switchTab(o)
    },
    canIUse(o) {
        return wx.canIUse(o)
    },
    makePhoneCall(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.makePhoneCall(options)
        })
    },

    showShareMenu(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.showShareMenu(options)
        })
    },

    getSystemInfo(options = {}) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.getSystemInfo(options)
        })
    },

    showActionSheet(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.showActionSheet(options)
        })
    },

    openLocation(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.openLocation(options)
        })
    },
    createSelectorQuery() {
        return wx.createSelectorQuery();
    },
    downloadFile(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.downloadFile(options)
        })
    },
    saveImageToPhotosAlbum(options) {
        return new Promise((success, fail) => {
            options.success = success;
            options.fail = fail;
            wx.saveImageToPhotosAlbum(options)
        })
    }
};
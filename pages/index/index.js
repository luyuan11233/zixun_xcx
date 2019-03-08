//index.js
//获取应用实例
const app = getApp()
const {getZiXunList} = require('../../apis')

Page({
    data: {
        banner:[],
        list:[]
    },
    //事件处理函数
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad() {
        let self = this;
        getZiXunList().then(
            res => {
                self.setData({
                    banner:res.data[1]?res.data[1].group_data:[],
                    list:res.data[0]?res.data[0].group_data:[],
                })
            }
        )
    },
    goDetail(e){

    }
})

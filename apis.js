/**
 * Created by JasonChou on 17/7/7.
 */

const wx = require('./libs/wx.js');
const http = require('./libs/http');
const md5 = require('./libs/md5.min');
const monent = require('./libs/moment.min');
const limit = 20;
const accountInfo = wx.getAccountInfoSync();
const appId = accountInfo.miniProgram.appId;

module.exports = {
    getZiXunList(){
        return http.get({url: '/news/list/general/hot', data: {}});
    },



















    getAuth(code, avatar, gender, nickname) {
        return http.get({url: '/new/wx/applet/auth', data: {code, avatar, gender, nickname, appId}});
    },
    refreshLogin(){
        return http.get({url:'/new/wx/applet/login',data:{}})
    },
    loginByWxUnionIdAPI(wxUnionId) {
        return http.post({
            url: '/new/h5/loginByWxUnionId',
            data: {
                wxUnionId
            }
        });
    },
    getUploadToken() {
        const timestamp = Date.now();
        const token = md5(md5(timestamp + 'wsdk') + timestamp + 'weimi');
        return http.get({
            url: '/new/wx/applet/qiniu/upload/token', data: {
                timestamp, token
            }
        });
    },
    // 圈子 页面
    getCircle(){
        return http.get({url:'/new/wx/applet/homepage',data:{}})
    },
    //圈子 精选
    getSpecialFeeds(region,time=0){
        return http.get({url:'/new/wx/applet/feeds/select/list',data:{region,time,limit}})
    },
    //圈子 最热
    getHotFeeds(updated=''){
        return http.get({url:'/new/wx/applet/feeds/latest/hot/list',data:{updated,limit}})
    },
    //圈子 最新
    getLatestFeeds(time=0){
        return http.get({url:'/new/wx/applet/feeds/latest/list',data:{time,limit}})
    },
    //圈子 关注
    getInBoxFeeds(time=0){
        return http.get({url:'/new/wx/applet/feeds/inbox/list',data:{time,limit}})
    },
    //获取全部的卡粉秀  最热
    getAllShowFansHot(time=0,refreshed=0){
        return http.get({url:'/new/showFans/hot',data:{refreshed,time,limit}})
    },
    //获取全部的卡粉秀  最新
    getAllShowFansLatest(time=0){
        return http.get({url:'/new/showFans',data:{time,limit}})
    },
    //获取全部话题
    getAllTopic(){
        return http.get({url:'/new/feed/topic/list',data:{}})
    },
    //获取动态话题列表
    getTopicFeedList(){
        return http.get({url:'/new/wx/applet/topic/feed/list',data:{}})
    },
    //获取话题
    getTopic(topicId){
        return http.get({url:'/new/wx/applet/topic/info',data:{topicId}})
    },
    //获取话题下的feeds列表
    getFeedsFromTopic(param,topicId,time=0){
        return http.get({url:'/new/topic/feeds/list',data:{param,topicId,time,limit}})
    },
    //关注话题
    followTopic(topicId){
        return http.post({url:'/new/topic/follow',data:{topicId}})
    },
    //取消关注话题
    disFollowTopic(topicId){
        return http.delete({url:'/new/topic/follow',data:{topicId}})
    },
    //获取详情 feed
    getFeedsDetail(_id){
        return http.get({url:'/new/feeds/common/detail',data:{_id}})
    },
    //获取我的帖子 feed
    getMyFeeds(userId,time=0){
        return http.get({url:'/new/outbox',data:{userId,time,limit}})
    },
    //获取用户信息学
    getUser(userId,isFollow=1){
        return http.get({url:'/new/users',data:{userId,isFollow}})
    },
    //创建feed
    createFeed(content,type,image_urls,topicId='',fanShow=''){
        return http.put({url:'/new/feeds',data:{content,type,image_urls,topicId,fanShow}})
    },
    //创建咖粉秀
    createFansShowFeed(content,image_urls,type){
        return http.post({url:'/new/wx/applet/fanShow/application',data:{content,image_urls,type}})
    },
    //获取关注列表
    getAllFollowings(index=0){
        return http.get({url:'/new/followings',data:{index,limit}})
    },
    //获取别人的关注列表
    getUserAllFollowings(userId,index=0){
        return http.get({url:'/new/followings/guest',data:{userId,index,limit}})
    },
    //我的粉丝列表
    getAllFollowers(index=0){
        return http.get({url:'/new/followers',data:{index,limit}})
    },
    //别人的粉丝列表
    getUserAllFollowers(userId,index=0){
        return http.get({url:'/new/followers/guest',data:{userId,index,limit}})
    },
    //我的消息列表
    getAllMessages(time=0){
        return http.get({url:'/new/notices/withoutQuestions',data:{time,limit}})
    },
    getMessageCount(){
        return http.get({url:'/new/wx/applet/notices/news/countWithFeed',data:{}})
    },
    //取关
    disFollowings(userId){
        return http.delete({url:'/new/followers',data:{userId}})
    },
    //关注
    followings(userId){
        return http.post({url:'/new/followers',data:{userId}})
    },
    //点赞 feed
    feedLike(feed_id){
        return http.post({url:'/new/feeds/detail/like',data:{feed_id}})
    },
    //取消点赞 feed
    feedDisLike(feed_id){
        return http.delete({url:'/new/feeds/detail/like',data:{feed_id}})
    },
    //feed 评论点赞
    feedCommentLike(_id){
        return http.post({url:'/new/feeds/comments/like',data:{_id}})
    },
    //取消feed 评论点赞
    feedCommentDisLike(_id){
        return http.delete({url:'/new/feeds/comments/like',data:{_id}})
    },
    //添加评论
    feedComment(feed_id,content,comment_id='',commentReply_id=''){
        return http.put({url:'/new/feeds/common/comments',data:{feed_id,content,comment_id,commentReply_id}})
    },
    //新用户换取 手机号
    decryptData(openId, encryptedData, iv, appId, session_key) {
        return http.get({
            url: '/new/wx/decryptData', data: {
                openId, encryptedData, iv, appId, session_key
            }
        });
    },
    //绑定新手机号
    bingPhone(phonenum,wxUnionId){
        return http.post({url:'/new/wx/applet/register',data:{phonenum,wxUnionId}})
    },



};
// pages/otherUser/otherUser.js
const app = getApp()
const Api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: 0,
    starred:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = options.user ;
    wx.setNavigationBarTitle({
      title: user,
    })
    this.setData({user:user})
    var data = app.getTokenData();
    this.getGithubUserInfo(user,data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var user = this.data.user;
    var data = app.getTokenData();
    this.checkFollowed(user,data);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getGithubUserInfo: function (user,data) {
    app.loading("Loading")
    var _this = this;

    Api.requestGet('/users/' + user, {
      success(res) {
        wx.hideLoading();
        var created_at = res.created_at;
        created_at = created_at.substring(0, 10);
        res.created_at = created_at;
        _this.setData({
          userInfo: res
        })
        // _this.getRepoInfo(res.login,data);
      }
    }, data)
  },
  getRepoInfo: function (user,data) {
    // app.loading("正在加载")
    var _this = this;
    Api.requestGet('/users/' + user + '/starred', {
      success(res) {
        wx.hideLoading();
        _this.setData({
          stars: res.length
        })
      }
    }, data)
  },
  toList:function(e){
    var selectType = e.currentTarget.dataset.type;
    var userName = this.data.userInfo;
    userName = userName.login;
    wx.navigateTo({
      url: '/pages/otherUser/userInfo/userInfo?selectType=' + selectType + '&userName=' + userName,
    })
  },
   /**
   * 检查是否follow
   */
  checkFollowed:function(user,data){
    var _this = this;
    Api.requestStarredGet('/user/following/'+user, {
      success(res) {
        wx.hideLoading();
        _this.setData({
          starred:res.starred
        })
      }
    }, data)
  },
   /**
   * starred 
   */
  beginFollow:function(user,data,token){
    var _this = this;
    Api.requestStarredPut('/user/following/'+user +'?access_token='+token, {
      success(res) {
        wx.hideLoading();
        _this.setData({
          starred:res.starred
        })
      }
    }, data)
  },
   /**
   * unstarred
   */
  unFollow:function(user,data,token){
    var _this = this;
    Api.requestStarredDelete('/user/following/'+user+'?access_token='+token, {
      success(res) {
        wx.hideLoading();
        _this.setData({
          starred:res.starred
        })
      }
    }, data)
  },
  toFollow:function(){
    var starred = this.data.starred;
    var user = this.data.user;
    var data = {};
    var token = app.getToken();
    if(token == ''){
      wx.showModal({
        title: 'unLogin',
        content: 'go to Login',
        confirmText:'Yes',
        cancelText:'No',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
          }
        }
      })
    }else{
      if(starred == 0){
        //尚未关注，开始关注
        this.beginFollow(user,data,token);
      }else if(starred == 1){
        //已经关注，取消关注
        this.unFollow(user,data,token);
      }
    }
   
  },
})
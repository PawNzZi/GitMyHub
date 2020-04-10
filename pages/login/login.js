// pages/login/login.js
const app = getApp()
const Api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  getTokenCode:function(e){
    console.log(e);
    var token = e.detail.value;
    this.setData({
      token:token
    })
  },
  loginToGithub:function(){
    var token = this.data.token ;
    this.getGithubUserInfo(token);
  },
  getGithubUserInfo: function (token) {
    app.loading("Loading")
    var _this = this;
    var data = {
      access_token: token,
    }
    Api.requestGet('/user', {
      success(res) {
        wx.hideLoading();
        wx.setStorageSync('userInfo', res);
        wx.setStorageSync('token',token);
        wx.navigateBack({
          delta: 2
        })
      }
    }, data)
  },
  copyUrl:function(){
    wx.setClipboardData({
      data: 'https://github.com/settings/tokens/new',
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
            app.showToast('复制成功');
          }
        })
      }
    })
  }
})
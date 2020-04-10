// pages/user/user.js
const app = getApp()
const Api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uToken: false,
    userInfo:[],
    stars:0
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    console.log(token)
    if (!token) {
      this.setData({
        auToken: false
      })
    } else {
      this.setData({
        auToken: true,
        token: token
      })
      var userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo)
      if (!userInfo.login) {
        this.getGithubUserInfo(token);
      } else {
        this.setData({
          userInfo: userInfo
        })
      }
    }
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
    console.log("show")
    var token = wx.getStorageSync('token')
    console.log(token)
    if (!token) {
      this.setData({
        auToken: false
      })
    } else {
      this.setData({
        auToken: true,
        token: token
      })
      var userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo)
      if (!userInfo.login){
        this.getGithubUserInfo(token);
      }else{
        this.setData({
          userInfo:userInfo
        })
      }
    }
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
      var token = app.getToken();
      this.getGithubUserInfo(token) ;
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
  getGithubUserInfo: function (token){
    // app.loading("正在加载")
    var _this = this;
    var data = {
      access_token: token,
    }
    Api.requestGet('/user', {
      success(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh() ;
        var created_at = res.created_at ;
        created_at = created_at.substring(0,10) ;
        res.created_at = created_at ;
        _this.setData({
          userInfo: res
        })
        wx.setStorageSync('userInfo',res);
        
      }
    }, data)
  },
  getRepoInfo: function (user,token) {

    var _this = this;
    var data = {
      access_token: token,
    }
    Api.requestGet('/user/starred', {
      success(res) {
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
    console.log(selectType)
    wx.navigateTo({
      url: '/pages/otherUser/userInfo/userInfo?selectType=' + selectType + '&userName=' + userName,
    })
  },
  toGitMyHub:function(){
    var repo_link = 'PawNzZi/GitMyHub'
    wx.navigateTo({
      url: '/pages/repos/repos?repo=' + repo_link,
    })
  }
})
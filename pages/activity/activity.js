// pages/activity/activity.js
const app = getApp()
const Api = require('../../utils/api.js');
const dateTool = require('../../utils/date.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    auToken:false,
    array:[],
    page: 1,
    nodata: true,
    noMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')

    if (!token) {
      this.setData({
        auToken: false
      })
    } else {
      var userInfo = wx.getStorageSync('userInfo')
      this.getActivityInfo(userInfo.login,1,token)
      this.setData({
        auToken: true,
        token: token,
        user: userInfo.login
      })
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
    this.checkToken();
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
    var user = this.data.user;
    var array = this.data.array;
    var token = app.getToken();
    array.length = 0 ;
    this.setData({page:1,array:array})
    this.getActivityInfo(user,1,token);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")
    var page = this.data.page;
    var user = this.data.user;
    var noMore = this.data.noMore;
    var token = app.getToken();
    page++;
    this.setData({
      page: page
    })
    if (noMore) {
      this.getActivityInfo(user,page,token)
    } else {
      app.showToast('no more data')
    }
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getActivityInfo: function (user,page,token) {
    app.loading("Loading")
    var _this = this;
    var data = {
      page:page,
      access_token:token
    };
    Api.requestGet('/users/'+ user +'/received_events', {
      success(res) {
        wx.hideLoading(); 
        if(res.length == 0){
          _this.setData({
            noMore:false,
            nodata:true
          })
        }else{
          _this.setData({
            noMore: true,
            nodata:true
          })
        }
        var list = _this.data.array;
        var d= _this.ztimeStamp(res);
        var array = list.concat(d);
        _this.setData({
          array:array,
        })
      }
    }, data)
  },
  checkToken:function(){
    var token = wx.getStorageSync('token')
    if (!token) {
      this.setData({
        auToken: false
      })
    } else {
      var user = this.data.user ;
      if(user == undefined){
        var userInfo = wx.getStorageSync('userInfo')
        user = userInfo.login
      }
      this.setData({
        auToken: true,
        token: token,
        user:user
      })
    }
  },
  ztimeStamp:function(array){
    for (var i = 0; i <array.length;i++){
      var t = array[i].created_at;
      var datas = dateTool.getDateDiff(new Date(t).getTime());
      console.log(datas)
      array[i].created_at = datas;
    }
    return array;
  },
  toOtherUser:function(e){
    var user = e.currentTarget.dataset.user;
    wx.navigateTo({
      url: '/pages/otherUser/otherUser?user='+user,
    })
  },
  toTHisRepo:function(e){
    var repo = e.currentTarget.dataset.repo;
    wx.navigateTo({
      url: '/pages/repos/repos?repo=' + repo,
    })
  }
})
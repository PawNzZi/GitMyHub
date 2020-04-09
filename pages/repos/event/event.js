// pages/repos/event/event.js
const app = getApp()
const Api = require('../../../utils/api.js');
const dateTool = require('../../../utils/date.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    page: 1,
    nodata: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var repo_link = options.repo_link;
    var token = wx.getStorageSync('token')
    this.setData({
      token: token,
      repo_link: repo_link,
   
    })
    this.getActivityInfo(repo_link, 1, token)
   
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
    var repo_link = this.data.repo_link;
    var array = this.data.array;
    var token = app.getToken();
    array.length = 0;
    this.setData({ page: 1, array: array })
    this.getActivityInfo(repo_link, 1, token);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")
    var page = this.data.page;
    var repo_link = this.data.repo_link;
    var isNextPage = this.data.isNextPage;
    var token = app.getToken();
    page++;
    this.setData({
      page: page
    })
    if (isNextPage) {
      this.getActivityInfo(repo_link, page, token)
    } else {
      app.showToast('no more data')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getActivityInfo: function (repo_link, page, token) {
    app.loading("Loading")
    var _this = this;
    var data = {
      page: page,
      access_token: token
    };
    Api.requestGet('/repos/' + repo_link + '/events', {
      success(res) {
        wx.hideLoading();
        if (res.length == 0 ) {
          if(page == 1){
            _this.setData({
              nodata: false,
              isNextPage:false
            })
          }else{
            _this.setData({
              nodata: true,
              isNextPage:false
            })
          }
        } else {
          _this.setData({
            nodata: true,
            isNextPage:true
          })
        }
        var list = _this.data.array;
        var d = _this.ztimeStamp(res);
        var array = list.concat(d);
        _this.setData({
          array: array,
        })
      }
    }, data)
  },
  ztimeStamp: function (array) {
    for (var i = 0; i < array.length; i++) {
      var t = array[i].created_at;
      var datas = dateTool.getDateDiff(new Date(t).getTime());
      console.log(datas)
      array[i].created_at = datas;
    }
    return array;
  },
  toOtherUser: function (e) {
    var user = e.currentTarget.dataset.user;
    wx.navigateTo({
      url: '/pages/otherUser/otherUser?user=' + user,
    })
  },
  toTHisRepo: function (e) {
    var repo = e.currentTarget.dataset.repo;
    wx.navigateTo({
      url: '/pages/repos/repos?repo=' + repo,
    })
  }
})
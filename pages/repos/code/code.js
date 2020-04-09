// pages/repos/code/code.js
const app = getApp()
const Api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var repo_link = options.repo_link;
    var path = options.path;
    if(path==undefined){
      path = ""
    }
    console.log("path="+path)
    var url = '/repos/' + repo_link + '/contents/'+path;
    var data = app.getTokenData();
    this.getContentInfo(url,data);
    this.setData({repo_link:repo_link,path:path})
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
    var path = this.data.path ;
    // var repo_link = this.data.repo_link ;
    console.log("path1="+path)
    if(path != ''){
      wx.setNavigationBarTitle({
        title: path,
      })
    }else{
      wx.setNavigationBarTitle({
        title: 'code',
      })
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
  getContentInfo: function (url,data) {
    app.loading("Loading")
    var _this = this;
    Api.requestGet(url, {
      success(res) {
        wx.hideLoading();
        _this.setData({
          array: res
        })
      }
    }, data)
  },
  toNext:function(e){
    var type = e.currentTarget.dataset.type ;
    var path = e.currentTarget.dataset.path ;
    var repo_link = this.data.repo_link ;
    if(type === 'dir'){
      wx.navigateTo({
        url: '/pages/repos/code/code?repo_link='+repo_link+'&path='+path,
      })
    }else if(type === 'file'){
      wx.navigateTo({
        url: '/pages/repos/code/viewCode/viewCode?repo_link='+repo_link+'&path='+path,
      })
    }
  }
})
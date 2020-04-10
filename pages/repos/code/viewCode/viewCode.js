// pages/repos/code/viewCode/viewCode.js
const app = getApp()
const Api = require('../../../../utils/api.js');
const Base64 = require('../../../../utils/base64.js') ;
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
    wx.setNavigationBarTitle({
      title: 'title',
    })
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
  getContentInfo: function (url,data) {
    app.loading("Loading")
    var _this = this;
    Api.requestGet(url, {
      success(res) {
        wx.hideLoading();
        var str = res.content;
        str = str.replace(/\ +/g,"");   
        // console.log(str);
        var content = Base64.baseDecode(str);
        let result = app.towxml(content,'markdown'
        );
        // 更新解析数据
        _this.setData({  
          article:result,
            });
      }
    }, data)
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
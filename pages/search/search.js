// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[],
    nodata:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log()
    var history = wx.getStorageSync('history');
    if(history.length == 0){
      this.setData({ history: history,nodata:false })
    }else{
      this.setData({ history: history, nodata: true})
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
    var history = wx.getStorageSync('history');
    if (history.length == 0) {
      this.setData({ history: history, nodata: false })
    } else {
      this.setData({ history: history, nodata: true })
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
  onSearch:function(e){
    console.log(e.detail);
    wx.navigateTo({
      url: '/pages/search/searchResult/searchResult?q='+e.detail,
    })
    var key = e.detail ;
    this.onCheckHistory(key);
    this.setData({
      value:''
    })
  },
  onCheckHistory:function(key){
    var history = this.data.history;
    var num = 0 ;
    for(var i = 0;i<history.length;i++){
      console.log(history[i])
      if(key == history[i]){
        num++
      }
    }
    console.log(num);
    if(num == 0){
      history.push(key);
      wx.setStorageSync('history', history)
    }
   
  },
  singleClick:function(e){
    var key = e.currentTarget.dataset.key;
    wx.navigateTo({
      url: '/pages/search/searchResult/searchResult?q=' + key,
    })
  },
  longTap:function(e){
    var key = e.currentTarget.dataset.key;
    var history = this.data.history;
    console.log(history)
    this.remove(key);
    
  },
  deleteAll:function(){
    var history = this.data.history;
    // wx.removeStorageSync('history')
    history.length = 0;
    wx.setStorageSync('history', history)
    this.setData({history:history,nodata:false})
    app.showToast("全部删除成功")
  },
  checkIndexOf: function(val){
    var history = this.data.history;
    for (var i = 0; i <history.length; i++) {
      if (history[i] == val) return i;
    }
    return -1;
  },
  remove:function(val) {
    var index = this.checkIndexOf(val);
    var history = this.data.history;
    if (index > -1) {
      history.splice(index, 1);
      console.log(history)
      wx.setStorageSync('history', history)
      if(history.length == 0){
        this.setData({ history: history, nodata: false })
      }else{
        this.setData({ history: history, nodata: true })
      }
    }
    app.showToast("删除成功")
  },

})
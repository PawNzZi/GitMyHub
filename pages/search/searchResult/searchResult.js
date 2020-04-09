// pages/search/searchResult/searchResult.js
const app = getApp()
const Api = require('../../../utils/api.js');
const dateTool = require('../../../utils/date.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectType: 0,
    array: [],
    total_count:0, 
    page:1,
    per_page:10 ,
    currentSince:"trending"
  },
  /****
   * 切换项目或用户
   */
  selectTag: function (e) {

    var token = app.getToken();
    var tag = e.currentTarget.dataset.tag;
    var key = this.data.key;
    var selectType = this.data.selectType;
    this.setData({page:1})
    if (tag != selectType) {
      var array = this.data.array;
      array.length = 0;
      this.setData({
        selectType: tag,
        array: array
      })
      if (tag == 0) {
        this.queryRepo(key,1,token);
      } else { 
        this.queryDve(key,1,token);
      }
    }
  },
  queryRepo: function (key,page,token) {
    app.loading("Loading")
    var _this = this;
    var data = {
      q: key,
      page: page,
      per_page:10,
      access_token:token
    }
    Api.requestGet('/search/repositories', {
      success(res) {
        wx.hideLoading();
        var num = res.total_count % 10;
        if (num == 0) {
          num = res.total_count / 10;
        } else {
          num = res.total_count / 10 + 1
        }
        var list = res.items;
        list = _this.ztimeStamp(list);
        var array = _this.data.array;
        array =  array.concat(list)
        _this.setData({
          array: array,
          total_page: num,
        })
      }
    }, data)

  },
  queryDve: function (key,page,token) {
    app.loading("Loading")
    var _this = this;
    var data = {
      q: key,
      page: page,
      per_page: 10,
      access_token:token
    }
    Api.requestGet('/search/users', {
      success(res) {
        wx.hideLoading();
        var num = res.total_count % 10;
        if(num == 0){
          num = res.total_count / 10;  
        }else{
          num = res.total_count / 10 + 1 
        }
        var list = res.items;
        var array = _this.data.array;
        array = array.concat(list)
        _this.setData({
          array: array,
          total_page: num,
        })
      }
    }, data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var key = options.q;
    var token = app.getToken();
    this.setData({key:key})
    this.queryRepo(key,1,token);
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

    var page = this.data.page;
    var key = this.data.key;
    var token = app.getToken();
    var total_page = this.data.total_page;
    var selectType = this.data.selectType;
    page++;
    this.setData({
      page:page
    })
    if (page <= total_page){
      if (selectType == 0){
        this.queryRepo(key, page,token);
      }else{
        this.queryDve(key, page,token);
      }
    }else{
      app.showToast('no more data')
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  ztimeStamp: function (array) {
    for (var i = 0; i < array.length; i++) {
      var t = array[i].updated_at;
      var datas = dateTool.getDateDiff(new Date(t).getTime());
      console.log(datas)
      array[i].updated_at = datas;
    }
    return array;
  },
  toRepoDetail: function (e) {
    var repo_link = e.currentTarget.dataset.repo;
    console.log(repo_link)
    wx.navigateTo({
      url: '/pages/repos/repos?repo=' + repo_link,
    })
  },
  toUserDetail:function(e){
    var user = e.currentTarget.dataset.user;
    wx.navigateTo({
      url: '/pages/otherUser/otherUser?user='+user,
    })
  }
})
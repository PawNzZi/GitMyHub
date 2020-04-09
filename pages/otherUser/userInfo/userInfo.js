// pages/otherUser/userInfo/userInfo.js
const app = getApp()
const Api = require('../../../utils/api.js');
const dateTool = require('../../../utils/date.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    page:1,
    nodata:false
  },
  /****
   * 切换项目或用户
   */
  selectTag:function(e){
    console.log(e);
    this.setData({page:1})
    var tag = e.currentTarget.dataset.tag ;
    var selectType = this.data.selectType;
    var token =this.data.token ;
    var repo = this.data.repo ;
    var starred = this.data.starred ;
    var follower = this.data.follower;
    var following = this.data.following;
    if (tag != selectType){
      var array = this.data.array;
      array.length = 0;
      this.setData({
        selectType:tag,
        array: array
      })
      if(tag == 0) {
        this.getRepoInfo(1,repo,token);
      }
      if(tag == 1){
        this.getRepoInfo(1,starred,token);
      } 
      if(tag == 2){
        this.getRepoInfo(1,follower,token);
      } 
      if(tag == 3){
        this.getRepoInfo(1,following,token);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var selectType = options.selectType;
      var userName = options.userName ;
      console.log(selectType) 
      var token = wx.getStorageSync('token') ;
      wx.setNavigationBarTitle({
        title: userName,
      })
      var repo = '/users/' + userName + '/repos';
      var starred = '/users/' + userName + '/starred' ;
      var follower = '/users/' + userName + '/followers';
      var following = '/users/' + userName + '/following';

      this.setData({
        selectType:selectType,
        token:token,
        userName:userName,
        repo:repo,
        starred:starred,
        follower:follower,
        following:following
      })
      // this.getRepoInfo(1,repo,token) ;
      if(selectType == 0) {
        this.getRepoInfo(1,repo,token);
      }
      if(selectType == 1){
        this.getRepoInfo(1,starred,token);
      } 
      if(selectType == 2){
        this.getRepoInfo(1,follower,token);
      } 
      if(selectType == 3){
        this.getRepoInfo(1,following,token);
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
    var selectType = this.data.selectType;
    var token = this.data.token; 
    var page = this.data.page;
    var nodata = this.data.nodata;
    var repo = this.data.repo ;
    var starred = this.data.starred ;
    var follower = this.data.follower;
    var following = this.data.following;
    page++;
    this.setData({
      page:page
    })
    if (nodata){
      if(selectType == 0) {
        this.getRepoInfo(page,repo,token);
      }
      if(selectType == 1){
        this.getRepoInfo(page,starred,token);
      } 
      if(selectType == 2){
        this.getRepoInfo(page,follower,token);
      } 
      if(selectType == 3){
        this.getRepoInfo(page,following,token);
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
  getRepoInfo: function (page,url,token) {
    app.loading("Loading")
    var _this = this;
    var data = {
      page:page,
      access_token: token,
    }
    Api.requestGet(url, {
      success(res) {
        wx.hideLoading();
        if (res.length == 0) {
          _this.setData({
            nodata: false,
          })
        } else {
          _this.setData({
            nodata: true,
          })
        }
        var list = res;
        list = _this.ztimeStamp(list);
        var array = _this.data.array;
        array =  array.concat(list)
        _this.setData({
          array: array
        })
      }
    }, data)
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
  toRepoDetail:function(e){
    var repo_link = e.currentTarget.dataset.author + '/' + e.currentTarget.dataset.name;
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
  },
})
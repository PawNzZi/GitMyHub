// pages/repos/repos.js
const app = getApp()
const Api = require('../../utils/api.js');
const Base64 = require('../../utils/base64.js') ; 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    issues:0,
    pulls:0,
    events:0,
    readMe:'',
    starred:0,
    loading:false,//判断是否加载
    urls: [{ url: '/pages/repos/code/code?repo_link=' }, { url: '/pages/repos/Issues/Issues?repo_link=' }, { url: '/pages/repos/pullRequests/pullRequests?repo_link=' }, { url:'/pages/repos/event/event?repo_link='}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = app.getTokenData();
    var repo_link = options.repo;
    this.setData({
      repo_link: repo_link
    })
    this.getRepoInfo(repo_link,data);
    this.getReadMeInfo(repo_link,data);
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
    var repo_link = this.data.repo_link;
    var data = app.getTokenData();
    this.checkStarred(repo_link,data);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getRepoInfo: function (repo_link,data) {
    app.loading("Loading")
    var _this = this;
    Api.requestGet('/repos/' + repo_link, {
      success(res) {
        wx.hideLoading();
        var updated_at = res.updated_at;
        updated_at = updated_at.substring(0,10);
        res.updated_at = updated_at
        _this.setData({
          repoInfo: res,
          loading:false,
        })
      }
    }, data)
  },
  getReadMeInfo: function (repo_link,data) {

    var _this = this;
    Api.requestGet('/repos/' + repo_link + '/readme', {
      success(res) {
        console.log(res);
        var str = res.content;
        str = str.replace(/\ +/g,"");   
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
  toNextPage:function(e){
    var type = e.currentTarget.dataset.type;
    var urls = this.data.urls;
    var repo_link = this.data.repo_link ;
    var path = '' ;
    wx.navigateTo({
      url: urls[type].url + repo_link +  '&path=' + path,
    })
  },
  // toWebView:function(e){
  //   var url = e.currentTarget.dataset.url ;
  //   wx.navigateTo({
  //     url: '/pages/webView/webView?url='+url,
  //   })
  // },
  /**
   * 检查是否starred
   */
  checkStarred:function(repo_link,data){
    var _this = this;
    Api.requestStarredGet('/user/starred/'+repo_link, {
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
  beginStarred:function(repo_link,data,token){
    var _this = this;
    Api.requestStarredPut('/user/starred/'+repo_link +'?access_token='+token, {
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
  unStarred:function(repo_link,data,token){
    var _this = this;
    Api.requestStarredDelete('/user/starred/'+repo_link+'?access_token='+token, {
      success(res) {
        wx.hideLoading();
        _this.setData({
          starred:res.starred
        })
      }
    }, data)
  },
  toStarred:function(){
    var starred = this.data.starred;
    var repo_link = this.data.repo_link;
    var data = {};
    var token = app.getToken();
    if(token == ''){
      wx.showModal({
        title: 'unLogin',
        content: 'Go To Login',
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
        this.beginStarred(repo_link,data,token);
      }else if(starred == 1){
        //已经关注，取消关注
        this.unStarred(repo_link,data,token);
      }
    }
    
  },
  toUser:function(e){
    var user = e.currentTarget.dataset.user;
    wx.navigateTo({
      url: '/pages/otherUser/otherUser?user='+user,
    })
  }
})
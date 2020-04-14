// pages/repos/Issues/Issues.js
const app = getApp();
const Api = require('../../../utils/api.js');
const dateTool = require('../../../utils/date.js');
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    selectType: 0,
    array: [],
    page:1,
    nodata:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = app.getToken();
    var repo_link = options.repo_link;
    this.setData({
     
      token:token,
      repo_link: repo_link
    })
    this.queryPull(1,'open',token,repo_link)
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
    var repo_link = this.data.repo_link;
    var page = this.data.page;
    var isNextPage = this.data.isNextPage;
    page++;
    this.setData({
      page:page
    })
    if (isNextPage){
      if (selectType == 0){
        this.queryPull(page,'open',token,repo_link)
      }else{
        this.queryPull(page, 'closed', token, repo_link)
      }
    }else{
      app.showToast('no more data')
    }
  },
  // toWebView:function(e){
  //   var url = e.currentTarget.dataset.url ;
  //   wx.navigateTo({
  //     url: '/pages/webView/webView?url='+url,
  //   })
  // },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
   /****
   * 切换项目或用户
   */
  selectTag: function (e) {
    console.log(e);
    var tag = e.currentTarget.dataset.tag;
    var selectType = this.data.selectType;
    var token = this.data.token ;
    var repo_link = this.data.repo_link;
    this.setData({page:1})
    if (tag != selectType) {
      var array = this.data.array;
      array.length = 0;
      this.setData({
        selectType: tag,
        array: array
      })
      if (tag == 0) {
        this.queryPull(1, 'open', token, repo_link);

      } else {
        this.queryPull(1, 'closed', token, repo_link);
      }
    }

  },
  queryPull: function (page,state,token,repo_link) {
    app.loading("Loading")
    var _this = this;
    var data = {
      state: state,
      page: page,
      access_token: token
    }
    Api.requestGet('/repos/' + repo_link + '/issues', {
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
        }  else {
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
      // console.log(datas)
      array[i].created_at = datas;
    }
    return array;
  },
})
//index.js
//获取应用实例
const app = getApp()
const network = require('../../utils/network.js') ;
Page({
  data: {
    active: 1,
    selectType:0, 
    array:[],
    langArray:[],
    sinces: [{
      name: 'Daily', color: '#2d8cf0',index:0
      },
      {
        name: 'Weekly', color: '#2d8cf0', index: 1
      },
      {
        name: 'Monthly', color: '#2d8cf0', index: 2
      },],
    showMenu: false,
    currentSince: "Daily",
    currentLanguse:"",
    currentIndex:0,
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']

  },
 
  onLoad: function () {
    var currentSince = this.data.currentSince;
    var currentLanguse = this.data.currentLanguse;
    this.queryRepo(currentLanguse, currentSince);
    this.queryLang();
  },
  /**
   * 关闭菜单
   */
  selectDateClick:function(){
    var showMenu = this.data.showMenu;
    if(!showMenu){
      this.setData({ showMenu: true });
    }
  },
  /**
   * 关闭菜单
   */
  onClose() {
    this.setData({ showMenu: false });
  },
  /**
   * 选中菜单
   */
  onSelect(event) {
    console.log(event.detail);
    var selectType = this.data.selectType;
    this.setData({
      currentSince:event.detail.name,
      currentIndex: event.detail.index
    })
    if (selectType == 0){
      this.queryRepo("", event.detail.name);
    }else{
      this.queryDve("", event.detail.name);
    }
   
  },
  /****
   * 切换项目或用户
   */
  selectTag:function(e){
    console.log(e);
    var tag = e.currentTarget.dataset.tag ;
    var currentSince = this.data.currentSince;
    var currentLanguse = this.data.currentLanguse;
    var selectType = this.data.selectType;
    
    if (tag != selectType){
      var array = this.data.array;
      array.length = 0;
      this.setData({
        selectType:tag,
        array: array
      })
      if (tag == 0) {
        this.queryRepo(currentLanguse, currentSince);

      } else {
        this.queryDve(currentLanguse, currentSince);
      }
    }
    
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    var selectType = this.data.selectType;
    var currentSince = this.data.currentSince;
    var currentLanguse = this.data.currentLanguse;
    var array = this.data.array;
    array.length = 0;
    this.setData({
      array: array
    })
    if (selectType == 0){
      this.queryRepo(currentLanguse, currentSince);
    }else{
      this.queryDve(currentLanguse, currentSince);
    }
    wx.stopPullDownRefresh();
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
  queryRepo:function(lang,since){
    app.loading("Loading")
    var _this = this ;
    var data = {
      lang: lang,
      since:since
    }
    network.requestGet('/repositories',{
      success(res){
        wx.hideLoading();
        _this.setData({
          array:res
        })
      }
    },data)

  },
  queryDve: function (lang, since) {
    app.loading("Loading")
    var _this = this;
    var data = {
      lang: lang,
      since: since
    }
    network.requestGet('/developers', {
      success(res) {
        wx.hideLoading();
        _this.setData({
          array: res
        })
      }
    }, data)
  },
  queryLang: function () {
    app.loading("Loading")
    var _this = this;
    var data = {
    }
    network.requestGet('/languages', {
      success(res) {
        wx.hideLoading();
        console.log(res);
        _this.setData({
          langArray: res.items
        })
      }
    }, data)
  },

})

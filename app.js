//app.js
const Api = require('/utils/api.js')
App({
  towxml:require('/towxml/index'),
  onLaunch: function () {
    var history = wx.getStorageSync('history');
    if (!history) {
      var initHistory = [];
      wx.setStorageSync(
        'history', initHistory
      );
    }
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      var userInfo = {};
      wx.setStorageSync(
        'userInfo', userInfo
      );
    }
    var token = wx.getStorageSync('token');
    if (token) {
      this.AuthenticateToken(token);
    }else{
      var token = '';
      wx.setStorageSync(
        'token', token
      );
    }
    //检查是否有新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log('请求完新版本信息的回调')
      if (res.hasUpdate){
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
        })
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
  globalData: {
    userInfo: null
  },
  loading:function(msg){
    wx.showLoading({
      title: msg,
      mask:true,
    })
  },
  showToast:function(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1000
    })
  },
  getToken:function(){
    var token = wx.getStorageSync('token');
    if(token){
      token = token
    }else{
      token = ''
    }
    return token ;
  },
  getTokenData:function(){
    var token = wx.getStorageSync('token');
    if(token){
      token = token
    }else{
      token = ''
    }
    var data = { access_token:token}
    return data ;
  },
  AuthenticateToken:function(token){
    var _this = this ;
    var data = {
      access_token: token,
    }
    Api.requestGet('/user', {
      success(res) {},
      fail(){
        console.log("401");
        _this.showToast('Token验证失败或已失效');
        wx.setStorageSync('token','');
      }
    }, data)
  }
})
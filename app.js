//app.js
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
    if (!token) {
      var token = '';
      wx.setStorageSync(
        'token', token
      );
    }
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
})
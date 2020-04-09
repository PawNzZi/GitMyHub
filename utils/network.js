const App = getApp();
var HOST_URL = 'https://github.lingyikz.cn'
var requestHandler = {
  success: function (res) { },
  fail: function (res) { },
}

//GET请求
function requestGet(url, requestHandler, data) {
  requestget(url, requestHandler, data);
}
function requestget(url, requestHandler, data) {

  wx.request({
    url: HOST_URL + url,
    data: data,
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      console.log(res);
      wx.hideLoading();
      if(res.statusCode == 200){
        requestHandler.success(res.data);
      } else if (res.statusCode == 404){
        console.log("wangluocuowu");
      } else if (res.statusCode == 500){
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
     
    },
    fail: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: '网络错误',
        icon:'none'
      })
      // requestHandler.fail(res.data);
    },
    complete: function () { },
  })
}
//POST请求
function requestPost(url, requestHandler, data) {
  requestpost(url, requestHandler, data);
}
function requestpost(url, requestHandler, data) {

  wx.request({
    url: HOST_URL + url,
    data: data,
    method: 'POST',
    header: { 'content-type': 'application/json' },

    success: function (res) {
      console.log(res)
      requestHandler.success(res);
      
    },
    fail: function () {
      // App._showFail("网络异常")
      // requestHandler.fail();
    },
    complete: function () { },
  })
}
module.exports = {
  requestGet: requestGet,
  requestPost: requestPost
}
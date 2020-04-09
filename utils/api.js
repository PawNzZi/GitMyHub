const App = getApp();
var HOST_URL = 'https://blog.lingyikz.cn'
var requestHandler = {
  success: function (res) { },
  fail: function () { },
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
      } 
      else if (res.statusCode == 403){
        // requestHandler.fail();
        wx.showToast({
          title: 'Github抽风了',
          icon: 'none'
        })
      } else if (res.statusCode == 500){
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }else if(res.statusCode == 401){
        requestHandler.fail();
      }
     
    },
    fail: function (res) {
      wx.hideLoading();
      wx.showToast({
        title: 'Github抽风了',
        icon:'none'
      })
      // requestHandler.fail();
    },
    complete: function () { },
  })
}
//StarredGet请求
function requestStarredGet(url, requestHandler, data) {
  requeststarredget(url, requestHandler, data);
}
function requeststarredget(url, requestHandler, data) {

  wx.request({
    url: HOST_URL + url,
    data: data,
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      wx.hideLoading();
      if(res.statusCode == 204){
        var res = {starred:1}
        requestHandler.success(res);
      } else if(res.statusCode == 404){
        var res = {starred:0}
        requestHandler.success(res);
      }
      else if (res.statusCode == 403){
        // requestHandler.fail();
        wx.showToast({
          title: 'Github抽风了',
          icon: 'none'
        })
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
        title: 'Github抽风了',
        icon:'none'
      })
      // requestHandler.fail();
    },
    complete: function () { },
  })
}
//StarredPut请求
function requestStarredPut(url, requestHandler, data) {
  requeststarredput(url, requestHandler, data);
}
function requeststarredput(url, requestHandler, data) {

  wx.request({
    url: HOST_URL + url,
    data: data,
    method: 'PUT',
    header: { 'content-type': 'application/json'},
    success: function (res) {

      wx.hideLoading();
      if(res.statusCode == 204){
        var res = {starred:1}
        requestHandler.success(res);
      } else if(res.statusCode == 404){
        var res = {starred:0}
        requestHandler.success(res);
      }
      else if (res.statusCode == 403){
        // requestHandler.fail();
        wx.showToast({
          title: 'Github抽风了',
          icon: 'none'
        })
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
        title: 'Github抽风了',
        icon:'none'
      })
      // requestHandler.fail();
    },
    complete: function () { },
  })
}
//StarredDelete请求
function requestStarredDelete(url, requestHandler, data) {
  requeststarreddelete(url, requestHandler, data);
}
function requeststarreddelete(url, requestHandler, data) {

  wx.request({
    url: HOST_URL + url,
    data: data,
    method: 'DELETE',
    header: { 'content-type': 'application/json',
  },
    success: function (res) {
  
      wx.hideLoading();
      if(res.statusCode == 204){
        var res = {starred:0}
        requestHandler.success(res);
      } else if(res.statusCode == 404){
        var res = {starred:0}
        requestHandler.success(res);
      }
      else if (res.statusCode == 403){
        // requestHandler.fail();
        wx.showToast({
          title: 'Github抽风了',
          icon: 'none'
        })
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
        title: 'Github抽风了',
        icon:'none'
      })
      // requestHandler.fail();
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
  requestPost: requestPost,
  requestStarredDelete:requestStarredDelete,
  requestStarredGet:requestStarredGet,
  requestStarredPut:requestStarredPut
}
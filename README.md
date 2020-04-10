
### GitMyHub

GitMyHub是一款主打轻、简约的gitHub小程序端，因为个人逛gitHub的频率比较高，手机上消耗的时间占了绝大多数，于是就想到写一个小程序版，这样方便很多，于是花了几天时间写了该小程序，实在想不到什么好听的名字，就取名为GitMyHub

### 页面展示
![gh_271433f67f25_258_meitu_1](http://image.lingyikz.cn/image/gh_271433f67f25_258_meitu_1_1586491309392.jpg)

### 说明

- 该小程序采用原生开发，使用原生开发时间比较久，熟悉些，这样效率高
- 原本想用企业资质注册小程序，这样可以用webview嵌入部分页面，后面细想时发现webview的业务域名需要验证。所以就用个人资质注册，不浪费企业资源了
- 本小程序调用的接口全是原生接口[api.github.com](https://api.github.com/),因为接口有访问限制，没授权的用户调用接口的频率是1小时60次，授权用户是1小时5000次。所以出现提示“github抽风了”是因为没授权，访问限制了，1小时候重新计算限制次数
- 授权登录，本小程序只支持token登录，并且token存在本地缓存中，不会上传服务器，用于突破访问限制和star、follow等操作
- Trending的接口是个人接口，其他的接口都是原生接口，由于api.github.com在国内没有备案，不能添加服务器域名，就采用了一些技术手段突破。
- 此源码仅供学习交流，禁止以任何形式独立发布或商业用途。

### 使用

    git clone git@github.com:PawNzZi/GitMyHub.git

### 功能
- [x] 日、周、月趋榜
- [x] 搜索你想要的项目
- [x] activity
- [x] 个人信息
- [x] 查看代码
- [x] 仓库信息
- [x] Issue相关
- [x] Pull request相关
- [x] star 和 follow
- [x] 更多细节等你来发现

### 更新记录

2020-04-10 GitMyHub正式上线

### 其他小程序
**微信搜索：13号档案馆——一个灵异爱好者的聚集地**
![gh_abd90451fe5d_258](http://image.lingyikz.cn/image/gh_abd90451fe5d_258_1579076870011.jpg)

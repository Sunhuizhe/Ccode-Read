# Insight
> 了解如何使用你的工具通过[Google Analytics](https://baike.baidu.com/item/google%20analytics/74509?fr=aladdin) 或者 [Yandex.Metrica](https://metrica.yandex.com/about?)做匿名报告。
## 安装
    $ npm install insight
## 获取数据/生成仪表板
### Google Analytics(GA)
* 使用[Embed API](https://developers.google.com/analytics/devguides/reporting/embed/v1/)嵌入图表
* 使用 [Core Reporting API](https://developers.google.com/analytics/devguides/reporting/core/v3/) 或是 [Real Time Reporting API](https://developers.google.com/analytics/devguides/reporting/realtime/v3/) 接收原始数据，然后将结果变成可视化图像，e.g. [metrics from Bower](https://bower.io/stats/)
* 直接使用GA的仪表板，比如：[metrics from Yeoman](http://yeoman.io/)
![screenshot-ga-dashboard.png](https://github.com/yeoman/insight/blob/master/screenshot-ga-dashboard.png)
## Provider设置
### Google Analytics(GA)
目前，由于使用的URL的原因，Insight必须设置为GA的web跟踪。未来的计划包括重构使用GA的基于应用程序的跟踪和测量协议。

debug调试中，Insight可以跟踪操作系统、Node.js以及实现了Insight的应用程序的版本。请按照下面的截图进行自定义设置。在Insight重构为基于应用程序的跟踪之前，这是一个临时的解决方案。

![screenshot-ga-custom-dimensions.png](https://github.com/yeoman/insight/blob/master/screenshot-ga-custom-dimensions.png)
## 收集数据
Insight非常关心用户数据的安全，对于它跟踪的数据力求做到完全透明。所有数据都是通过HTTPS安全连接发送。Insight提供的API给用户的随时退出提供了一个简单的办法。

以下是Insight可以跟踪的数据。个人实现的话可以不跟踪一些项目。
* 实现Insight的模块版本
* 模块命令/事件（如：install/search）
* 常用命令的包的名称和版本
* 开发调试的node.js和操作系统的版本
* 一个随机的、绝对的匿名ID
## 使用
### Google Analytics
    const Insight = require('insight');
    const pkg = require('./package.json');
    
    const insight = new Insight({
  
	//GA追踪码
	trackingCode: 'UA-XXXXXXXX-X',
	pkg
    });
  
    //第一次请求许可
    if (insight.optOut === undefined) {
	  insight.askPermission();
    }
  
    insight.track('foo', 'bar');
    
    //按照`/foo/bar`格式记录
    insight.trackEvent({
	  category: 'eventCategory',
	  action: 'eventAction',
	  label: 'eventLabel',
	  value: 'eventValue'
    });
    //记录behavior/events 部分
### Yandex.Metrica
    const Insight = require('insight');
    const pkg = require('./package.json');
    
    const insight = new Insight({
	  // Yandex.Metrica 计数id
	  trackingCode: 'XXXXXXXXX'
	  trackingProvider: 'yandex',
	  pkg
    });
  
    // 第一次请求许可
    if (insight.optOut === undefined) {
	  insight.askPermission();
    }
  
    insight.track('foo', 'bar');
    // 按照`http://<package-name>.insight/foo/bar`格式记录
## API
### Insight(options)
#### trackingCode
**必需**

类型：`string`

你的GA追踪码或者Yandex.Metrica计数id。
#### trackingProvider
类型：`string`

默认：google

值：google Yandex

用于追踪供应商。

#### pkg
##### name
**必需**

类型：`string`
##### version
类型：`string`

默认：`undefined`
#### config
类型：`object`

默认：一个configstore实例

如果你想用自己的配置机制代替默认的基于configstore的实例，你可以提供一个可以实现两种同步方法的对象：
* get(key)
* set(key, value)
### 实例方法
#### .track(keyword, [keyword, ...])
参数作为Analytics的一条结束路径。

.track('init', 'backbone') 变成 /init/backbone
#### .trackEvent(options)
可以接收事件的类型，功能，标签和值，通过选项对象在GA event tracking文档作为描述。注意：不在Yandex.Metrica上工作。
  .trackEvent({
	  category: 'download',
	  action: 'image',
	  label: 'logo-image'
  });
##### category
**必需**
类型：`string`

事件类别：通常是相互交流的对象（如：'Video'）
##### action
**必需**
类型：`string`

事件行为：互动方式（如：'play'）
##### label
类型：`string`

事件标签：用来把事件分类（如：'Fall Campaign'）
##### value
类型：`integer`

事件值：与事件相关的一个数值（如：42）
#### .askPermission([message, callback])
得到用户的进入许可，并且在config里设置optOut属性。你也可以选择在config里手动设置optOutproperty。

![screenshot-askpermission.png](https://github.com/yeoman/insight/blob/master/screenshot-askpermission.png)

可选的提供你自己的message和callback。如果message为空，默认被使用。你在提示下选择继续运行的时候，如果提示完毕并有效，回调函数会被调用，参数是error和optIn。
#### .optOut
返回一个布尔值，表示该用户是否退出追踪。最好只由用户行为设置，比如：一个提示。
## 许可证
BSD-2-Clause © Google









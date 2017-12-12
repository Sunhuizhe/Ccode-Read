# Insight 项目解读
## 项目分析
### 项目名称
Insight
### 项目类型
第三方库
### 项目功能
了解如何使用你的工具通过Google Analytics 或者 Yandex.Metrica做匿名报告。
### 包含文件
* [readme文件](https://github.com/yeoman/insight/blob/master/readme.md)

([readme中文文件](https://github.com/Sunhuizhe/Code-Read/blob/master/Insight-Chinese.md))
> 项目说明，包括项目介绍、配置方法、用到的API、使用方法、所使用的函数等
* [.gitinore](https://github.com/Sunhuizhe/code-read-insight/blob/master/.gitignore)
> 别人下载你的项目时可以忽略的东西
* [.travis.yml](https://github.com/Sunhuizhe/code-read-insight/blob/master/.travis.yml)
> Travis CI 集成测试配置文件
* [LICENSE](https://github.com/Sunhuizhe/code-read-insight/blob/master/LICENSE)
> 许可文件
* [package.json](https://github.com/Sunhuizhe/code-read-insight/blob/master/package.json)
> 代码打包后配置文件
* .png 文件
> 各种成果及过程图片文件
### 包含文件夹
* [lib](https://github.com/yeoman/insight/tree/master/lib)
> 程序代码文件夹
* [test](https://github.com/yeoman/insight/tree/master/test)
> 测试代码文件夹
### 入口文件
index.js

> 暴露Insight类，使其作为一个模块可以被其他文件引用。
### 项目依赖的模块
* async：异步流程控制
* lodash.debounce：返回为 nodejs 模块
* request：HTTP 请求模块
* tough-cookie：创建 cookie 保存数据用以设置 url
* uuid：生成一个唯一的 uuid

## 代码分析
### 文件
* [providers.js源码](https://github.com/yeoman/insight/blob/master/lib/providers.js)
* [providers.js解读](https://github.com/Sunhuizhe/code-read-insight/blob/master/lib/providers.js)
> 暴露了两个方法，一个是 `goole(id,payload)` ，一个是 `yandex(id, payload)` ，根据 providers 不同选择相应的方法。
> 函数用于提供 requset 请求所需的参数，返回一个对象。
* [push.js源码](https://github.com/yeoman/insight/blob/master/lib/push.js)
* [push.js解读](https://github.com/Sunhuizhe/code-read-insight/blob/master/lib/push.js)
> 为 `message` 事件添加了一个监听机制，如果有信息更新，就和以前的信息队列合并，如果更新失败了，就重新把以前的信息队列存储下来。

## 测试
### 自动化测试框架
ava
### 测试命令
    $ npm test
> [AVA 安装](https://segmentfault.com/a/1190000010416900)
### AVA 测试成果
![AVA 测试成果图](https://github.com/Sunhuizhe/code-read-insight/blob/master/images/test.png)

11个测试成功，1个跳过，因为需要在仪表板上实时显示数据，需要手动测试。
### 持续集成测试
Travis CI

## 解读收获
1. 关于 nodejs 不支持 es6 中的 import 语法问题
> 刚开始装了AVA之后，测试文件依然运行不成功，报错指向 import 语法。 nodejs 还没有支持 import 语法，升级 nodejs 版本也没有解决问题。百度之，在多次试验之后，有一个方法生效了。装了一个插件！[官方网址](http://babeljs.io/docs/plugins/transform-es2015-modules-commonjs/)。按照网站给出的方法运行命令安装，应该是将 ES6 Modules 转换成 nodejs 通用的 commonjs 形式。
> 注意点：安装插件时配置 .babelrc 文件，只能在一个 {} 里配置多个属性，写多个 {} 不能正确读取，会报错。
2. 关于程序代码的一些函数的学习

* Object.assign(q, msg.queue);

功能：将源对象中可枚举的自有属性值拷贝到目标对象中，源对象可以有任意多个。

参数：

q {object} target 目标对象

msg.queue {object} 源对象,任意个

返回值：

{object} target 返回目标对象
* async.forEachSeries(Object.keys(q), cb(el, cb))
功能：遍历对象的属性，对每个属性执行回调函数

参数:

{string} attr 属性

{function} callback() 回调函数

## LICENSE
MIT

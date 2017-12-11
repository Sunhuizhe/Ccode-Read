# Insight 项目解读
## 项目分析
### 包含文件
* [readme文件](https://github.com/yeoman/insight/blob/master/readme.md)
* [readme中文文件](https://github.com/Sunhuizhe/Code-Read/blob/master/Insight-Chinese.md)
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
* lib
> 主要代码文件文件夹
* test
> 测试代码文件夹
### 项目名称
Insight
### 项目类型
第三方库
### 项目功能
了解如何使用你的工具通过Google Analytics 或者 Yandex.Metrica做匿名报告。
### 项目依赖的模块
* async：异步流程控制
* lodash.debounce：返回为 nodejs 模块
* request：HTTP 请求模块
* tough-cookie：创建 cookie 保存数据用以设置 url
* uuid：生成一个唯一的 uuid
### 入口文件
index.js

暴露Insight类作为一个模块被其他文件引用。

## 代码分析
### 文件
* [providers.js源码](https://github.com/yeoman/insight/blob/master/lib/providers.js)
* [providers.js解读](https://github.com/Sunhuizhe/code-read-insight/blob/master/lib/providers.js)
* [push.js源码](https://github.com/yeoman/insight/blob/master/lib/push.js)
* [push.js解读](https://github.com/Sunhuizhe/code-read-insight/blob/master/lib/push.js)

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

## LICENSE
MIT

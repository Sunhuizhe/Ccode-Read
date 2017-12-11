// 严格模式
// 引入模块
'use strict';
const qs = require('querystring');

/*
 * Tracking providers
 * 每个provider都是一个函数，这个函数为request()方法的call方法提供对象，参数
 * 有两个，id 和 path。它被called之后会与 insight 类型的对象绑定。
 * */

// 暴露这个接口
module.exports = {
	// GA网址 — https://www.google.com/analytics/
  	/**
   	* 如果用GA，调用此方法
   	*
   	* @param {} id id
   	* @param {} path 路径
   	* */
	google(id, payload) {
		const now = Date.now();  
    		//Date.now() 1970 年 1 月 1日午夜与当前日期和时间之间的毫秒数

		const _qs = {
			// GA Measurement 协议的 API 版本
       			v: 1,

			// Hit 类型
			t: payload.type,

			// 匿名 IP
			aip: 1,

			tid: this.trackingCode,

			// 随机 UUID
			cid: this.clientId,

			cd1: this.os,

			// GA 自定义维度 2 = Node 版本, 范围 = Session
			cd2: this.nodeVersion,

			// GA 自定义维度 3 = App 版本, 范围 = Session (重构前的临时解决方案)
			cd3: this.appVersion,

			// Queue 延迟时间 (ms) 从现在到追踪的时间
			qt: now - parseInt(id, 10),

			// 最后一个参数发送后清除缓存
			z: now
		};

		// 根据追踪类型设置 payload 数据
		if (payload.type === 'event') {
			_qs.ec = payload.category;
			_qs.ea = payload.action;
      			// 如果 label 存在
			if (payload.label) {
				_qs.el = payload.label;
			}
      			// 如果 value 存在
			if (payload.value) {
				_qs.ev = payload.value;
			}
		} else {
			_qs.dp = payload.path;
		}
    
    		// 返回一个对象供 request() 使用
		return {
			url: 'https://ssl.google-analytics.com/collect',
			method: 'POST',
			// GA 的文档建议，body 的 payload 用 POST 代替通过 querystring 转码的 GET
      			body: qs.stringify(_qs)
     			// 将 _qs 转变为 'key1=value1&key2=value2' 的格式
		};
	},
	
  	// Yandex.Metrica 的网址 - http://metrica.yandex.com
	yandex(id, payload) {
		const request = require('request');

		const ts = new Date(parseInt(id, 10))
			.toISOString()
			.replace(/[-:T]/g, '')
			.replace(/\..*$/, '');
      
      		// toISOString() 使用 ISO 标准返回 Date 对象的字符串格式
      		// 两次正则替换
      		// 先将 '-'、':'和'T' 替换为 ''
      		// 再将从 '.' 一直到最后替换为 ''

      
		const path = payload.path;
		const qs = {
			wmode: 3,
			ut: 'noindex',
			'page-url': `http://${this.packageName}.insight${path}?version=${this.packageVersion}`,
			'browser-info': `i:${ts}:z:0:t:${path}`,
			// 清除缓存
      			rn: Date.now()
		};

		const url = `https://mc.yandex.ru/watch/${this.trackingCode}`;

		// 使用 touch-cookie 设置自定义 cookie
    		const _jar = request.jar();
		const cookieString = `name=yandexuid; value=${this.clientId}; path=/;`;
		const cookie = request.cookie(cookieString);
		_jar.setCookie(cookie, url);
    
    		//返回的对象
		return {
			url,
			method: 'GET',
			qs,
			jar: _jar
		};
	}
};

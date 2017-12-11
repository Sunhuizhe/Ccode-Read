// 在严格模式下进行操作
// 引入需要的三个模块
'use strict';
const request = require('request');
const async = require('async');
const Insight = require('.');

// 通知每个去抖的'track()'
// 获取队列，与之前的合并，并且上传所有数据
// 如果失败，重新储存数据

/*
 * 给事件添加监听机制
 * 
 * @param {string} name 事件名称
 * @param {function} callback() 回调函数
 */
process.on('message', msg => {
	const insight = new Insight(msg);
	const config = insight.config;
	const q = config.get('queue') || {};


  	// 将传进来的队列的可枚举属性复制，删除原队列

  	/*
   	* 将源对象中可枚举的自有属性值拷贝到目标对象中，源对象可以有任意多个。
   	*
   	* @param {object} target 目标对象
   	* @param {object} [,soure...] 源对象
   	* @return {object} target 返回目标对象
   	* */
	Object.assign(q, msg.queue);
	config.delete('queue');
  
  	/*
   	* 遍历对象的属性，对每个属性执行回调函数
   	*
   	* @param {string} attr 属性
   	* @param {function} callback() 回调函数
   	* */
	async.forEachSeries(Object.keys(q), (el, cb) => {
    		// 获取 id 和 payload 属性，以便获取 request 请求的对象
		const parts = el.split(' ');
		const id = parts[0];
		const payload = q[el];

  		/*
  		 * 发起HTTP请求
  		 *
   		 * @param {url对象或者url地址} url
    		 * @param {function} callback(err) 回调函数
    		 * */
		request(insight._getRequestObj(id, payload), err => {
			if (err) {
				cb(err);
				return;
			}

			cb(); // 调用回调函数
		});
	}, err => {
		if (err) {
      			// 如果失败，重新将数据保存回原来的地方
			const q2 = config.get('queue') || {};
			Object.assign(q2, q);
			config.set('queue', q2);
		}

		process.exit();   //退出程序
	});
});

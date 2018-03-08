'use strict';

require('shelljs/global');

const fs = require('fs');
const tools = require('./tools');
const logger = require('./logger');
const prompt = require('./prompt.js');


exports.init = function (dirname) {
	let hint = '给新建的主题起个名字：'	
	prompt.startStepByStep({
		step1: ()=> {
			prompt.readLine(hint, function (data) {
				if (tools.illegal(data)) {
					hint = '主题名称只能包含小写字母、数字和下划线，并不能以数字开头，请重新输入：'
				} else if (tools.exist(data)) {
					hint = data + '已存在，请重新输入新建的业务页面名：'
					return false
				} else {
					hint = ''
					exec('mkdir ' + data)
					return true
				}
			})
		}
	})
	
}
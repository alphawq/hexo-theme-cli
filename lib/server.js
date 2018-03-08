'use strict';

require('shelljs/global');
const fs = require('fs');
const chalk = require('chalk');
const logger = require('./logger');

exports.init = function (dirname) {
	if (typeof dirname !== 'string') {
		logger.fatal('请指定主题名称');
		return
	}
	exec("mkdir " + dirname);
}
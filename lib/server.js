'use strict';

require('shelljs/global');
const fs = require('fs');

exports.init = function () {
	var name = process.argv[2];
	exec("echo hello " + name);
}
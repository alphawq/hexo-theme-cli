'use strict';

const fs = require('fs');
const logger = require('./logger')

exports.illegal = function(name) {
  return !/^[a-z0-9_]+?$/.test(name) || /^\d/.test(name)
}

exports.exist = function(name) {
  let dirArr = []
  dirArr = fs.readdirSync(process.cwd())
  return dirArr.indexOf(name) > -1
}
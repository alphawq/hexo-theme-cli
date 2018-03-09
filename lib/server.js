'use strict';

require('shelljs/global');

const fs = require('fs');
const tools = require('./tools');
const logger = require('./logger');
const prompt = require('./prompt.js');


exports.init = function(template) {
  let hint = '给新建主题起个名字：'
  prompt.startStepByStep({
    step1: ()=> {
      prompt.readLine(hint, function (data) {
        if (tools.illegal(data)) {
          hint = '主题名只能包含_、字母、数字，且不能以数字开头，请重新输入：'
        } else if (tools.exist(data)) {
          hint = `${data}已存在，请重新输入目录名称：`
          return false
        } else {
          hint = ''
          tools.build(data, template)
          return true
        }
      })
    }
  }, 0)
}
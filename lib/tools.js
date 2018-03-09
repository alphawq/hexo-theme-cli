'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('./logger')
const base = require('./base')

let _autoMake = function(name, template) {
	cd(name) 
	for (let key in base) {
		if (~key.indexOf('.')) { 
			fs.writeFileSync(key, base[key]);
			logger.success(`${key }`)
			break
		}
		mkdir('-p', key)
		logger.success(`${key }`)
		cd(key)
		base[key].forEach(item => { 
			fs.writeFileSync(`${item.name}.${item.suffix || template}`, item.value || '')
			logger.success(`${item.name}.${item.suffix || template} `)
		})
		cd('-')
	}
}

exports.build = function(name, template) {
	mkdir(name)
	_autoMake(name, template)
	logger.success(`😁  恭喜您，项目初始化成功！`)
}

exports.illegal = function(name) {
  return !/^[a-z0-9_]+?$/.test(name) || /^\d/.test(name)
}

exports.exist = function(name) {
  let dirArr = fs.readdirSync(process.cwd())
  return dirArr.indexOf(name) > -1
}

// like `mkdir -p`
exports.mkdirp = function mkdirp(dirs, cb) {
  let paths = dirs.split('/') 
  !function next(i) {
    if (i > paths.length) return cb()
    let current = paths.slice(0, i++).join('/')
    fs.access(current, fs.constants.R_OK, function(err) {
      if (err) {
        fs.mkdir(current, () => next(i))
      } else {
        next(i)
      }
    })
  }(1)
}
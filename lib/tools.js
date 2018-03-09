'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('./logger')
const base = require('./base')

let _autoMakeConfig = function(name, template) {
  fs.writeFileSync(`${name}/_config.yml`, `
# Header
menu:
  Home: /
  Archives: /archives

# Content
excerpt_link: Read More
fancybox: true

# Sidebar
sidebar: right
widgets:
- category
- tag
- tagcloud
- archive
- recent_posts

# display widgets at the bottom of index pages (pagination == 2)
index_widgets:
# - category
# - tagcloud
# - archive

# widget behavior
archive_type: 'monthly'
show_count: false

# Miscellaneous
google_analytics:
gauges_analytics:
favicon: /favicon.png
twitter:
google_plus:
fb_admins:
fb_app_id:
`);
};

let _autoMakeDir = function(name, template) {
	cd(name)
	for (let key in base) {
		mkdir('-p', key)
		base[key].forEach(item => {
			fs.writeFileSync(item.name, item.value)
			cd('-')
		})
	}

}



exports.build = function(name, template) {
	mkdir(name)
	_autoMakeConfig(name, template)
	_autoMakeDir(name)
}

exports.illegal = function(name) {
  return !/^[a-z0-9_]+?$/.test(name) || /^\d/.test(name)
}

exports.exist = function(name) {
  let dirArr = []
  dirArr = fs.readdirSync(process.cwd())
  return dirArr.indexOf(name) > -1
}

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
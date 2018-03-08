var chalk = require('chalk')
var format = require('util').format
var Table = require('cli-table2');

/**
 * Prefix.
 */

var prefix = '   hexome'
var sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.log = function () {
  var msg = format.apply(format, arguments)
  console.log(chalk.white(prefix), sep, msg)
}

/**
 * Log a `warning` to the console.
 *
 * @param {String} message
 */

exports.warn = function () {
  var msg = format.apply(format, arguments)
  console.log(chalk.yellow(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.fatal = function (message) {
  if (message instanceof Error) message = message.message.trim()
  var msg = format.apply(format, arguments)
  console.error(chalk.red(prefix), sep, msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

exports.success = function () {
  var msg = format.apply(format, arguments)
  console.log(chalk.green(prefix), sep, msg)
}

/**
 * Log a `table` to the console
 * @param {Array} header table-header
 * @param {Array} data   table-body 
 */
exports.table = function (header, data) {
  var table = new Table({
    head: header
  });

  if(data.length) {
    data.forEach(function(v, i) {
      table.push(v);
    });
  }
  console.log(table.toString());
}
/*log4js have 6 level:trace, debug, info, warn, error, fatal*/
// logger.trace('trace');
// logger.debug("debug");
// logger.info("info");
// logger.warn("warn");
// logger.error("error");
// logger.fatal("fatal");

var config = require('../config');

var env = process.env.NODE_ENV || "development"


var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
  ]
});

var logger = log4js.getLogger('cheese');
logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger;

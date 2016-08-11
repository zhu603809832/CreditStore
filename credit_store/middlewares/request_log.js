var logger = require('../lib/log');

module.exports = function (req, res, next) {
  // Assets do not out log.
  if (exports.ignore.test(req.url)) {
    next();
    return;
  }

  var t = new Date();
  logger.info('\n\nStarted', t.toISOString(), req.method, req.url, req.ip);

  res.on('finish', function () {
    var duration = ((new Date()) - t);
    logger.info('Completed', res.statusCode, ('(' + duration.toString() + 'ms)').green);
  });

  next();
};

exports.ignore = /^\/(public|agent)/;

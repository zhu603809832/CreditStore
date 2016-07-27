var mongoose = require('mongoose');
var config = require('../config');
var logger = require('../lib/log')

mongoose.connect(config.db, {
    server: { poolSize: 20 }
}, function(err) {
    if (err) {
        logger.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./user');

exports.User = mongoose.model('User');

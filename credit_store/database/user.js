var settings = require('./settings');
var mongodb = require("mongodb");
var server = new mongodb.Server(settings.database.HOST, settings.database.PORT, { auto_reconnect: true, native_parser: true });
var db = new mongodb.Db(settings.database.DBNAME, server, { safe: false });

module.exports = db;

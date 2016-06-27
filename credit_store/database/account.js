var settings = require('./settings');
var db_settings = settings.database;
var account_settings = settings.account;

var mongodb = require("mongodb");
var server = new mongodb.Server(db_settings.HOST, db_settings.PORT, { auto_reconnect: true, native_parser: true });
var db = new mongodb.Db(db_settings.DBNAME, server, { safe: false });

function mongodb_connection_insert(tbData) {
    db.open(function(err, db) {
        if (!err) {
            db.collection(account_settings.COLLECTION_NAME, function(err, collection) {
                var nCurSuccessDataIndex = 0;
                for (var i = 0; i < tbData.length; i++) {
                    var row_data = tbData[i];
                    var account = row_data[1];
                    var password = row_data[2];
                    var wechat = row_data[3];
                    var mail = row_data[4];
                    var phone = row_data[5];
                    //timestamp
                    var ts = new Date().getTime();
                    //var i = ts % 1000;
                    //var timestamp = new mongodb.BSONPure.Timestamp(i, Math.floor(ts * 0.001));

                    collection.insert({
                        account: account,
                        password: password,
                        wechat: wechat,
                        mail: mail,
                        phone: phone,
                        createtime: ts,
                    }, function(err, data) {
                        if (data) {
                            console.log('collection: %s Successfully Insert data:[%d]', account_settings.COLLECTION_NAME, nCurSuccessDataIndex);
                            nCurSuccessDataIndex++;
                            if (nCurSuccessDataIndex >= tbData.length) {
                                console.log('collection: %s Successfully Insert End, total is :[%d]', account_settings.COLLECTION_NAME, tbData.length)
                                db.close();
                            };
                        } else {
                            console.log('collection: %s Failed to Insert', account_settings.COLLECTION_NAME);
                        }
                    });
                };
            });
        } else {
            console.log("mongodb_connection_insert db.open error:", err);
        }
    });
}

function mongodb_connection_find() {
    db.open(function(err, db) {
        if (!err) {
            db.collection(account_settings.COLLECTION_NAME, function(err, collection) {
                collection.find().toArray(function(err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('collection:%s Successfully find', account_settings.COLLECTION_NAME);
                        db.close();
                    }
                })
            });
        } else {
            console.log("mongodb_connection_find db.open error:", err);
        }
    });
}

function mongodb_connection_drop(callback, param1, param2) {
    db.open(function(err, db) {
        if (!err) {
            db.collection(account_settings.COLLECTION_NAME, function(err, collection) {
                db.dropCollection(account_settings.COLLECTION_NAME, function(err, result) {
                    if (err) {
                        console.log('err:', err);
                    } else {
                        console.log('ok:', result);
                        console.log('collection:%s Successfully drop', account_settings.COLLECTION_NAME);
                        db.close();
                        if (callback) {
                            callback(param1, param2)
                        };
                    }
                });
            });
        } else {
            console.log("mongodb_connection_drop db.open error:", err);
        }
    });
}
module.exports.mongodb_connection_insert = mongodb_connection_insert;
module.exports.mongodb_connection_find = mongodb_connection_find;
module.exports.mongodb_connection_drop = mongodb_connection_drop;

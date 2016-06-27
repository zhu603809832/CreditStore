var mongodb_account = require('../database/account.js');
var assert = require('assert');

describe("account.js", function() {
    describe("mongodb_connection_insert", function() {
        it("should insert the database data successfully.", function(done) {
            var ts = new Date().getTime();
            var tbData = {
                account: "test_account0001",
                password: "test_password0001",
                wechat: "test_wechat0001",
                mail: "test_mail0001@163.com",
                phone: "18319157139",
                createtime: ts,
            };
            var tbArrayData = new Array();
            tbArrayData.push(tbData)
            mongodb_account.mongodb_connection_insert(tbArrayData);
            done();
        })
    });

    describe("mongodb_connection_find", function() {
        it("should find the database data successfully.", function(done) {
            mongodb_account.mongodb_connection_find();
            done();
        })
    });

    describe("mongodb_connection_drop", function() {
        it("should drop the database data successfully.", function(done) {
            var ts = new Date().getTime();
            var tbData = {
                account: "test_account0001",
                password: "test_password0001",
                wechat: "test_wechat0001",
                mail: "test_mail0001@163.com",
                phone: "18319157139",
                createtime: ts,
            };
            var tbArrayData = new Array();
            tbArrayData.push(tbData)
            mongodb_account.mongodb_connection_drop(null);
            done();
        })
    });
});

var encrypt = require('../lib/encrypt.js');
var assert = require('assert');

describe("encrypt.js", function() {
    describe("Hash", function() {
        it("should Hash param 2 return encrypt", function(done) {
            encrypt.Hash("password", function(err, salt, hashvalue) {
                if (err) throw err;
                console.log("salt:",salt);
                console.log("hashvalue:",hashvalue);
                done();
            })
        })
    });

    describe("Hash", function() {
        it("should Hash param 3 return encrypt", function(done) {
            encrypt.Hash("password", "salt", function(err, hashvalue) {
                if (err) throw err;
                console.log("hashvalue:",hashvalue);
                done();
            })
        })
    });

    describe("encrypt", function() {
        it("should get encrypt.", function(done) {
            var str = "zhuzhuowei"
            var secret = "secret"
            var result = encrypt.encrypt(str, secret);
            console.log("encrypt:",result);
            done();
        })
    });

    describe("decrypt", function() {
        it("should get decrypt.", function(done) {
            var str = "745ac680c89be5d0d5154dc4428516b4"
            var secret = "secret"
            var result = encrypt.encrypt(str, secret);
            console.log("decrypt:", encrypt.decrypt(str, secret));
            done();
        })
    });
});

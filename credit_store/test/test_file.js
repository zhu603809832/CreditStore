var file = require('../lib/file.js');
var assert = require('assert');
var testFilePath = __dirname + '/data/test_file_data.txt';

describe("file.js", function() {
    describe("ReadTabFileSync", function() {
        it("should sync return data array object", function(done) {
            var data = file.ReadTabFileSync(testFilePath, "utf-8");
            assert.ok(data);
            assert.equal(data[0][0], "test0001", "test case should be expect.");
            assert.equal(data[0][1], "123456", "test case should be expect.");
            assert.equal(data[0][2], "test0001", "test case should be expect.");
            console.log(data);
            done();
        })
    });

    describe("ReadTabFileASync", function() {
        it("should async return data array object", function(done) {
            file.ReadTabFileASync(testFilePath, "utf-8", function(data) {
                assert.ok(data);
                assert.equal(data[0][0], "test0001", "test case should be expect.");
                assert.equal(data[0][1], "123456", "test case should be expect.");
                assert.equal(data[0][2], "test0001", "test case should be expect.");
                console.log(data);
                done();
            });
        })
    });
});

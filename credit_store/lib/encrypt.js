var crypto = require('crypto');
var LENGTH = 128;
var ITERATIONS = 12000;

function Hash(pasword, salt, callback) {
    if (3 == arguments.length) {
        crypto.pbkdf2(pasword, salt, ITERATIONS, LENGTH, function(err, hash) {
            callback(err, hash.toString('base64'));
        });
    }
    else { //没有salt，产生salt
        callback = salt;
        crypto.randomBytes(LENGTH, function(err, salt) {
            if (err) return callback(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pasword, salt, ITERATIONS, LENGTH, function(err, hash) {
                if (err) return callback(err);
                callback(null, salt, hash.toString('base64'));
            });
        });
    }
}

//加密cookie
function encrypt(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}
//解密cookie
function decrypt(str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

module.exports.Hash = Hash;
module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;

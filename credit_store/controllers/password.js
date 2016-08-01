var validator = require('validator');
var User = require('../proxy').User;
var uuid = require('node-uuid');
var mail = require('../lib/mail');
var tools = require('../lib/tools');
var config = require('../config');
var eventproxy = require('eventproxy');

exports.showPasswordRecoveryPage = function(req, res, next) {
    res.render('password_recovery');
};

//密码找回
exports.passwordRecovery = function(req, res, next) {
    var email = validator.trim(req.body.email).toLowerCase();
    if (!validator.isEmail(email)) {
        return res.render('password_recovery', { error: '邮箱不合法', email: email });
    }

    // 动态生成retrive_key和timestamp到users collection,之后重置密码进行验证
    var retrieveKey = uuid.v4();
    var retrieveTime = new Date().getTime();

    User.getUserByMail(email, function(err, user) {
        if (!user) {
            res.render('password_recovery', { error: '没有这个电子邮箱。', email: email });
            return;
        }
        user.retrieve_key = retrieveKey;
        user.retrieve_time = retrieveTime;
        user.save(function(err) {
            if (err) {
                return next(err);
            }
            // 发送重置密码邮件
            mail.sendResetPassMail(email, retrieveKey, user.loginname);
            res.render('notify', { success: '我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码。' });
        });
    });
};

//密码重置
exports.resetPasssword = function(req, res, next) {
    var key = validator.trim(req.query.key || '');
    var name = validator.trim(req.query.name || '');

    User.getUserByNameAndKey(name, key, function(err, user) {
        if (!user) {
            res.status(403);
            return res.render('notify', { error: '信息有误，密码无法重置。' });
        }
        var now = new Date().getTime();
        var expirt_time = config.reset_password_expire_time;
        if (!user.retrieve_time || now - user.retrieve_time > expirt_time) {
            res.status(403);
            return res.render('notify', { error: '该链接已过期，请重新申请。' });
        }
        return res.render('password_reset', { name: name, key: key });
    });
};

exports.updatePassword = function(req, res, next) {
    var psw = validator.trim(req.body.psw) || '';
    var repsw = validator.trim(req.body.repsw) || '';
    var key = validator.trim(req.body.key) || '';
    var name = validator.trim(req.body.name) || '';

    var ep = new eventproxy();
    ep.fail(next);

    if (psw !== repsw) {
        return res.render('password_reset', { name: name, key: key, error: '两次密码输入不一致。' });
    }
    User.getUserByNameAndKey(name, key, ep.done(function(user) {
        if (!user) {
            return res.render('notify', { error: '错误的激活链接' });
        }
        tools.bhash(psw, ep.done(function(passhash) {
            user.password = passhash;
            user.retrieve_key = null;
            user.retrieve_time = null;
            user.active = true; // 用户激活

            user.save(function(err) {
                if (err) {
                    return next(err);
                }
                return res.render('notify', { success: '你的密码已重置。' });
            });
        }));
    }));
};

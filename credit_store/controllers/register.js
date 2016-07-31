var validator = require('validator');
var eventproxy = require('eventproxy');
var utility = require('utility');
var logger = require('../lib/log')
var tools = require('../lib/tools');
var mail = require('../lib/mail');
var config = require('../config');
var proxy = require('../proxy')
var User = proxy.User;

exports.showRegisterPage = function(req, res, next) {
    res.render('register', { title: 'website register' });
};

exports.register = function(req, res, next) {
    var email = validator.trim(req.body.mail).toLowerCase();
    var loginname = validator.trim(req.body.name).toLowerCase();
    var password = validator.trim(req.body.password);
    var confirmpassword = validator.trim(req.body.confirmpassword);

    var ep = new eventproxy();
    ep.fail(next);
    ep.on('prop_err', function(msg) {
        res.status(422);
        //res.render('register',{}) //客户端用angularjs，就不用render了。
        res.send({ code: 0, msg: msg, email: email, account: loginname, title: 'website register' });
    })

    //验证信息的正确性
    if ([email, loginname, password, confirmpassword].some(function(item) {
            return item === '';
        })) {
        return ep.emit('prop_err', '你输入的信息不完整。');
    }

    if (loginname.length < 5) {
        return ep.emit('prop_err', '用户名至少需要5个字符。');
    }

    if (!tools.validateId(loginname)) {
        return ep.emit('prop_err', '用户名不合法。');
    }

    if (!validator.isEmail(email)) {
        return ep.emit('prop_err', '邮箱不合法。');
    }

    if (password !== confirmpassword) {
        return ep.emit('prop_err', '两次输入密码不一致。');
    }
    //验证信息的正确性 END
    User.getUsersByQuery({
        '$or': [
            { 'loginname': loginname },
            { 'email': email }
        ]
    }, {}, function(err, users) {
        if (err) {
            return next(err);
        }

        if (users.length > 0) {
            ep.emit('prop_err', '用户名或邮箱已被使用。');
            return;
        }

        tools.bhash(password, ep.done(function(passhash) {
            // create gravatar
            var avatarUrl = User.makeGravatar(email);
            User.newAndSave(loginname, loginname, passhash, email, avatarUrl, false, function(err) {
                if (err) {
                    return next(err);
                }
                // 发送激活邮件
                mail.sendActiveMail(email, utility.md5(email + passhash + config.session_secret), loginname);
                res.send({ code: 1, msg: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。', email: email, account: loginname, title: 'website register' });
            });

        }));
    });
};

exports.activeAccount = function(req, res, next) {
    console.log("test!!!activeAccount")
    var key = validator.trim(req.query.key);
    var name = validator.trim(req.query.name);
    User.getUserByLoginName(name, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new Error('[ACTIVE_ACCOUNT] no such user: ' + name));
        }
        var passhash = user.password;
        if (!user || utility.md5(user.email + passhash + config.session_secret) !== key) {
            return res.render('notify', { error: '信息有误，帐号无法被激活。' });
        }
        if (user.active) {
            return res.render('notify', { error: '帐号已经是激活状态。' });
        }
        user.active = true;
        user.save(function(err) {
            if (err) {
                return next(err);
            }
            res.render('notify', { success: '恭喜，帐号激活成功，请登录' });
        });
    });
};

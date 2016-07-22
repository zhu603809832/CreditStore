var validator = require('validator');
var eventproxy = require('eventproxy');
var logger = require('../lib/log')
var config = require('../config');
var tools = require('../lib/tools');

exports.showRegisterPage = function(req, res, next) {
    res.render('register', { title: 'website register' });
};

exports.register = function(req, res, next) {
    var email = validator.trim(req.body.mail).toLowerCase();
    var account_name = validator.trim(req.body.name).toLowerCase();
    var password = validator.trim(req.body.password);
    var confirmpassword = validator.trim(req.body.confirmpassword);

    var ep = new eventproxy();
    ep.fail(next);
    ep.on('prop_err', function(msg) {
        res.status(422);
        //res.render('register',{}) //客户端用angularjs，就不用render了。
        res.send({ code: 0, msg: msg, email: email, account: account_name, title: 'website register' });
    })

    //验证信息的正确性
    if ([email, account_name, password, confirmpassword].some(function(item) {
            return item === '';
        })) {
        return ep.emit('prop_err', '你输入的信息不完整。');
    }

    if (account_name.length < 5) {
        return ep.emit('prop_err', '用户名至少需要5个字符。');
    }

    if (!tools.validateId(account_name)) {
        return ep.emit('prop_err', '用户名不合法。');
    }

    if (!validator.isEmail(email)) {
        return ep.emit('prop_err', '邮箱不合法。');
    }

    if (password !== confirmpassword) {
        return ep.emit('prop_err', '两次输入密码不一致。');
    }
    
    res.send({ code: 1, msg: email + "注册成功！", email: email, account: account_name, title: 'website register' });
};

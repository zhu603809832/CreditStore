var eventproxy = require('eventproxy');
var User = require('../proxy').User;
var tools = require('../lib/tools');
var mail = require('../lib/mail');
var authMiddleWare = require('../middlewares/auth');

exports.showLoginPage = function(req, res, next) {
    req.session._loginReferer = req.headers.referer;
    res.render('login', { title: 'website login' });
};

exports.login = function(req, res, next) {
    var loginname = validator.trim(req.body.name).toLowerCase();
    var pass = validator.trim(req.body.pass);
    var ep = new eventproxy();
    ep.fail(next);

    if (!loginname || !pass) {
        res.status(422);
        return res.send({ code: 0, error: '信息不完整。', title: 'website login' });
    }

    var getUser = null;
    if (loginname.indexOf('@') !== -1) {
        getUser = User.getUserByMail;
    } else {
        getUser = User.getUserByLoginName;
    }

    ep.on('login_error', function(login_error) {
        res.status(403);
        res.send({ error: '用户名或密码错误', title: 'website login' });
    });
    getUser(loginname, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return ep.emit('login_error');
        }
        var passhash = user.pass;
        tools.bcompare(pass, passhash, ep.done(function(bool) {
            if (!bool) {
                return ep.emit('login_error');
            }
            if (!user.active) {
                // 重新发送激活邮件
                mail.sendActiveMail(user.email, utility.md5(user.email + passhash + config.session_secret), user.loginname);
                res.status(403);
                return res.send({ error: '此帐号还没有被激活，激活链接已发送到 ' + user.email + ' 邮箱，请查收。' });
            }
            // store session cookie
            authMiddleWare.gen_session(user, res);
            //check at some page just jump to home page
            var notJump = [
                '/active_account', //active page
                '/reset_pass', //reset password page, avoid to reset twice
                '/signup', //regist page
                '/search_pass' //serch pass page
            ];
            var refer = req.session._loginReferer || '/';
            for (var i = 0, len = notJump.length; i !== len; ++i) {
                if (refer.indexOf(notJump[i]) >= 0) {
                    refer = '/';
                    break;
                }
            }
            res.redirect(refer);
        }));
    });
};

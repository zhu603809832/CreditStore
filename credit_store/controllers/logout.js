var config = require('../config');

exports.showLogoutPage = function(req, res, next) {
    res.render('logout', { title: 'website logout' });
    console.log("showLogoutPage")
};

exports.logout = function(req, res, next) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect('/');
};

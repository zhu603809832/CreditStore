var express = require('express');
var config = require('./config');
var index = require('./controllers/index');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var register = require('./controllers/register');
var info = require('./controllers/info');
var template = require('./controllers/template');
var users = require('./controllers/users');

var router = express.Router();

router.get('/', index.showIndexPage);//主页面
router.get('/index', index.showIndexPage);//主页面
router.post('/index', index.index);//主页面

router.get('/login', login.showLoginPage);//登陆页面
router.post('/login', login.login);//登陆逻辑

router.get('/logout', logout.showLogoutPage);//注销页面
router.post('/logout', logout.logout);//注销逻辑

router.get('/register', register.showRegisterPage);
router.post('/register', register.register);
router.get('/active_account', register.activeAccount);

router.get('/info', info.showInfoPage);
router.post('/info', info.info);

router.get('/template', template.showTemplatePage);
router.post('/template', template.template);

router.get('/users', users.showUsersPage);
router.post('/users', users.users);

module.exports = router;
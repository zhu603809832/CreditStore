var express = require('express');
var config = require('./config');
var index = require('./controllers/index');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var register = require('./controllers/register');
var password = require('./controllers/password');
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

router.get('/register', register.showRegisterPage);//注册页面
router.post('/register', register.register);//注册逻辑
router.get('/active_account', register.activeAccount);//激活账号逻辑

router.get('/password_recovery', password.showPasswordRecoveryPage);//密码找回页面
router.post('/password_recovery', password.passwordRecovery);////密码找回逻辑
router.get('/password_reset', password.resetPasssword);//密码重置页面，需要传递参数
router.post('/password_reset', password.updatePassword);//密码重置逻辑

router.get('/info', info.showInfoPage);//个人信息
router.get('/info/baseinfo', info.showBaseInfo);//基本信息
router.get('/info/personinfo', info.showPersonInfo);//个人资料
router.get('/info/accountsettings', info.accountSettings);//账号设置
router.get('/info/accountsettings/loginpassword', info.loginPassword);//账号设置——登录密码
router.get('/info/accountsettings/phonenumber', info.phoneNumber);//账号设置——电话号码
router.get('/info/accountsettings/paypassword', info.payPassword);//账号设置——支付密码
router.get('/info/accountsettings/securityquestion', info.securityQuestion);//账号设置——安全问题
router.get('/info/mycredit', info.myCrediteInfo);//我的积分
router.get('/info/moneyconsume', info.myMoneyConsumeRecord);//金额消费
router.get('/info/creditconsume', info.myCreditConsumeRecord);//积分消费

router.post('/info', info.info);

router.get('/template', template.showTemplatePage);
router.post('/template', template.template);

router.get('/users', users.showUsersPage);
router.post('/users', users.users);

module.exports = router;
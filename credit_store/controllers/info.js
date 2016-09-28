var time = require('../lib/time')

exports.showInfoPage = function(req, res, next){
    var curTime = new Date();
    var curHour = curTime.getHours();
    res.locals.current_user.tip_hello = time.getTimePartString(curHour) + "好，";
    res.locals.info_key = "default";
    res.render('info', {});
};

exports.showBaseInfo = function(req, res, next){
	res.locals.info_key = "baseinfo";
    console.log(res.locals.current_user);
    var username = res.locals.current_user.name;
    var email = res.locals.current_user.email;
    var phone = res.locals.current_user.phone || "unknown";
	res.render('info', {username : username, email : email, phone : phone});
}

exports.showPersonInfo = function(req, res, next){
    res.locals.info_key = "personinfo";
    res.render('info', {});
}

exports.accountSettings = function(req, res, next){
    res.locals.info_key = "accountsettings";
    res.locals.detail_key = "default";
    res.render('info', {});
}

exports.loginPassword = function(req, res, next){
    res.locals.info_key = "accountsettings";
    res.locals.detail_key = "loginpassword";
    res.render('info', {});
}

exports.phoneNumber = function(req, res, next){
    res.locals.info_key = "accountsettings";
    res.locals.detail_key = "phonenumber";
    res.render('info', {});
}

exports.payPassword = function(req, res, next){
    res.locals.info_key = "accountsettings";
    res.locals.detail_key = "paypassword";
    res.render('info', {});
}

exports.securityQuestion = function(req, res, next){
    res.locals.info_key = "accountsettings";
    res.locals.detail_key = "securityquestion";
    res.render('info', {});
}

exports.myCrediteInfo = function(req, res, next){
    res.locals.info_key = "mycrediteinfo";
    var credit = res.locals.current_user.score;
    res.render('info', {credit: credit});
}

exports.myMoneyConsumeRecord = function(req, res, next){
    res.locals.info_key = "monneyconsumerecord";
    res.render('info', {});    
}

exports.myCreditConsumeRecord = function(req, res, next){
    res.locals.info_key = "creditconsumerecord";
    res.render('info', {});
}

exports.info = function(req, res, next){
    
    
};

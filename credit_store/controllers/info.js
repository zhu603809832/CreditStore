var time = require('../lib/time')

exports.showInfoPage = function(req, res, next){
    var curTime = new Date();
    var curHour = curTime.getHours();
    res.locals.current_user.tip_hello = time.getTimePartString(curHour) + "好，";
    res.locals.info_key = "default";
    res.render('info', {});
};

exports.showPersonInfo = function(req, res, next){
    res.locals.info_key = "personinfo";
    res.render('info', {});
}

exports.accountSettings = function(req, res, next){
    res.locals.info_key = "accountsettings";
    res.render('info', {});
}

exports.securityCenter = function(req, res, next){
    res.locals.info_key = "securitycenter";
    res.render('info', {});
}

exports.info = function(req, res, next){
    
    
};

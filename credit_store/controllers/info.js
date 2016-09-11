var time = require('../lib/time')

exports.showInfoPage = function(req, res, next){
    var curTime = new Date();
    var curHour = curTime.getHours();
    res.locals.current_user.tip_hello = time.getTimePartString(curHour) + "好，";
    res.render('info', {});
};

exports.showPersonInfo = function(req, res, next){
    console.log("showPersonInfo")
}

exports.accountSettings = function(req, res, next){
    console.log("accountSettings")
}

exports.securityCenter = function(req, res, next){
    console.log("securityCenter")
}

exports.info = function(req, res, next){
    
    
};

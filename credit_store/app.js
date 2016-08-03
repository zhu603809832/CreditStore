var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require('./config');
require('./models');
var auth = require('./middlewares/auth');
var errorPageMiddleware = require('./middlewares/error_page');
var webRouter = require('./web_router');

//instance
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
app.set('view engine', 'html');
app.enable('trust proxy');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.session_secret));
app.use(express.static(path.join(__dirname, 'public')));
/*
//session-memroy
//var settings = require('./database/settings');
//var mongoStoreSession = require('connect-mongodb');
//var db = require('./database/session');
app.use(session({
    cookie: { maxAge: 60000 },
    secret: settings.session.COOKIE_SECRET,
    name: settings.session.NAME, //default:connect.sid
    resave: false,
    saveUninitialized: false,
}));

//session-mongodb
app.use(session({
    cookie: { maxAge: 6000 },
    secret: settings.session.COOKIE_SECRET,
    store: new mongoStoreSession({  
        username: settings.session.USERNAME,
        password: settings.session.PASSWORD,
        url: settings.session.URL,
        db: db})
}))
*/
//session-redis 
app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
  }),
  resave: false,
  saveUninitialized: false,
}));

// custom middleware
//app.use(auth.authUser);
app.use(auth.blockUser());

//http://www.sxt.cn/info-2562-u-324.html
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
})

app.use('/', webRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(errorPageMiddleware.errorPage);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log("development error handler", err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log("production error handler", err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var file = require('./lib/file');

//database 
var settings = require('./database/settings');
//var mongoStoreSession = require('connect-mongodb');
//var db = require('./database/session');
var mongodb_account = require('./database/account');

//router
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var template = require('./routes/template');
var info = require('./routes/info');

//instance
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('html', require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session-memroy
app.use(session({
    cookie: { maxAge: 60000 },
    secret: settings.session.COOKIE_SECRET,
    name: settings.session.NAME, //default:connect.sid
    resave: false,
    saveUninitialized: false,
}));

//session-mongodb
/*app.use(session({
    cookie: { maxAge: 6000 },
    secret: settings.session.COOKIE_SECRET,
    store: new mongoStoreSession({  
        username: settings.session.USERNAME,
        password: settings.session.PASSWORD,
        url: settings.session.URL,
        db: db})
}))
*/

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

app.use('/', routes);
app.use('/template', template);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/info', info);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
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
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function InitAccountDataFromFile() {
    var filename = settings.account.DATA_FILE
    var array_data = new Array();
    array_data = file.ReadTabFileSync(settings.account.DATA_FILE, 'utf-8');
    app.array_data = array_data;
    //console.log('app.InitAccountDataFromFile');
}

function InitAccountCollection() {
    mongodb_account.mongodb_connection_insert(app.array_data);
    console.log('app.InitAccountCollection');
}

function PasswordEncryptCache() {
    console.log("PasswordEncryptCache")
    app.password_cach = {}
}

InitAccountDataFromFile();
InitAccountCollection();
//PasswordEncryptCache();

module.exports = app;

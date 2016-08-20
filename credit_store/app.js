var config = require('./config');
require('colors');
var path = require('path');
var Loader = require('loader');
var express = require('express');
var session = require('express-session');
require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models');
var webRouter = require('./web_router');

var auth = require('./middlewares/auth');
var errorPageMiddleware = require('./middlewares/error_page');
var proxyMiddleware = require('./middlewares/proxy');
var RedisStore = require('connect-redis')(session);
var _ = require('lodash');
var compress = require('compression');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var errorhandler = require('errorhandler');
var requestLog = require('./middlewares/request_log');
var renderMiddleware = require('./middlewares/render');
var logger = require('./lib/log');
var helmet = require('helmet');

var assets = {};

if (config.mini_assets) {
  try {
    assets = require('./assets.json');
  } catch (e) {
    logger.error('You must execute `make build` before start app when mini_assets is true.');
    throw e;
  }
}

//instance
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
app.set('view engine', 'html');
app.enable('trust proxy');

//app.use(requestLog);

if (config.debug) {
  // 渲染时间
  app.use(renderMiddleware.render);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/agent', proxyMiddleware.proxy);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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
app.use(require('response-time')());
app.use(helmet.frameguard('sameorigin'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(require('method-override')());
app.use(cookieParser(config.session_secret));
app.use(compress());
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
app.use(auth.authUser);
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

_.extend(app.locals, {
  config: config,
  Loader: Loader,
  assets: assets
});

// error handlers
app.use(errorPageMiddleware.errorPage);
_.extend(app.locals, require('./lib/render_helper'));
app.use(function (req, res, next) {
  res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
  next();
});

if (config.debug) {
  app.use(errorhandler());
};
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

if (!module.parent) {
  app.listen(config.port, function () {
    logger.info(config.name + ' listening on port ', config.port);
    logger.info('God bless love....');
    logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
    logger.info('');
  });
}

module.exports = app;

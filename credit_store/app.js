var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

//database 
var settings = require('./database/settings');
var mongoStoreSession = require('connect-mongodb');
var db = require('./database/session');
var lineReader = require('line-reader');

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
app.engine('html',require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
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
  name: settings.session.NAME,//default:connect.sid
  resave: false,
  saveUninitialized:true, 
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
app.use(function(req, res, next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = '';
  if (err) {
    res.locals.message = '<dive class="alert alert-warning">' + err + '</div>';
  };
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

app.InitAccountData = function()
{
  var filename = settings.account.DATA_FILE
  var tbAccountData = new Array();
  console.log("readfrom file:%s start!", filename);
  var lineNum = 0;
  /*
  //asynchronous call
  lineReader.eachLine(filename, function(line, last, callback){
    var content = line.split('\t')
    tbAccountData[lineNum] = content
    lineNum = lineNum + 1;
    if (callback) {
      callback();
    };

    if (last) {
      console.log("readfrom file:%s end! Length:%d.", filename, tbAccountData.length);
      this.tbAccountData = tbAccountData || {};
      return false;
    };
  })
*/
  //sync call
  var all_data = fs.readFileSync(filename, "utf-8");
  var all_content = all_data.split('\n')
  for (var i = 0; i < all_content.length; i++) {
    var row_content = all_content[i].split("\t");
    //delete the ending 
    row_content[row_content.length - 1] = row_content[row_content.length - 1].replace(/\r|\n/ig,"");
    console.log(row_content);
  };
  //console.log(all_content);
}

app.InitAccountData();

module.exports = app;

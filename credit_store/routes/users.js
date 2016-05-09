var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET users listing. */
router.get('/', function(req, res, next) {
	var session = req.session
	session.count = session.count || 0;
	var n = session.count++;
    //res.send('respond with a resource');
    res.send('hello, session id:' + session.id + ' count:' + n);
});

module.exports = router;

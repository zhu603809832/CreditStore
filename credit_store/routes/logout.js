var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	//res.render('logout', { title: 'website logout' });
    req.session.user = null;
    req.redirect('/');
});

// router.post('/', function(req, res, next) {
//     req.session.user = null;
//     req.redirect('/');
// });

module.exports = router;

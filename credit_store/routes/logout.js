var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	//res.render('login', { title: 'website login' });
});

router.post('/', function(req, res, next) {
    req.session.user = null;
    req.redirect('/');
    // var user={
    //     username: 'zhuzhuowei@163.com',
    //     password: '123456'
    // }
    // console.log(req.body);
    // if(req.body.username === user.username && req.body.password === user.password){
    // 	req.session.user = user;
    //     res.redirect('/');
    // }
    // else
    // {
    // 	res.redirect('/login');	
    // }    
});

module.exports = router;

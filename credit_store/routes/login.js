var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('login', { title: 'website login' });
    console.log("test login crypto!!!!!!!!!!!!")
    console.log(crypto.getHashes());
});

router.post('/', function(req, res, next) {
    var user={
        username: 'zhuzhuowei@163.com',
        password: '123456'
    }
    
    if(req.body.username === user.username && req.body.password === user.password){
    	req.session.user = user;
        res.redirect('/');
    }
    else
    {
    	res.redirect('/login');	
    }
    
});

module.exports = router;

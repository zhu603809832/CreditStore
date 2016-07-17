var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'website register' });
});

router.post('/', function(req, res, next) {
    var register_mail = req.body.mail;
    var register_account = req.body.name;
    var register_password = req.body.password;
    var register_confirmpassword = req.body.confirmpassword;

    var ret_data = {
        msg : "",
        code : 1,
    };
    
	if (register_mail == null || register_mail == "" || 
        register_account == null || register_account == "" || 
        register_password == null || register_password == "" ||
        register_confirmpassword == null || register_confirmpassword == "") {
        ret_data.code = 0;
        ret_data.msg = "注册失败，输入参数错误。",
        res.send(ret_data)
        return
    }
    
    if (register_password != register_confirmpassword) {
        ret_data.code = 0;
        ret_data.msg = "注册失败，两次输入密码不一致。",
        res.send(ret_data)
        return
    };

    res.send(ret_data);
});

module.exports = router;

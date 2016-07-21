exports.showTemplatePage = function(req, res, next){
    res.render('template', { title: 'website template' });
    console.log("showTemplatePage")
};

exports.template = function(req, res, next){
    /*var user={
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
    }*/
    console.log("template")
};
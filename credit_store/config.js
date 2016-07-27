var path = require('path');

var config = {
    debug: true,
    name: 'CreditStore', // 网站的名字
    description: '澳门积分俱乐部', // 网站的描述
    keywords: 'Aomen, Macao, Macau, CreditStore',
    site_logo: '/public/images/cnodejs_light.svg', // default is `name`
    site_icon: '/public/images/cnode_icon_32.png', // 默认没有 favicon, 这里填写网址
    // 社区的域名
    host: 'localhost',
    // 邮箱配置
    mail_opts: {
        host: 'smtp.126.com',
        port: 465,
        auth: {
            user: 'club@126.com',
            pass: 'club'
        }
    },
    // mongodb 配置
    db: 'mongodb://127.0.0.1/credit_store_dev',
    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,

    session_secret: 'credit_store_secret', // 务必修改
    auth_cookie_name: 'credit_store',
};

if (process.env.NODE_ENV === 'test') {
    config.db = 'mongodb://127.0.0.1/credit_store_test';
}

module.exports = config;

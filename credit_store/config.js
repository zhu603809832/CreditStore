var path = require('path');

var config = {
    debug: true,
    get mini_assets() { return !this.debug; }, // 是否启用静态文件的合并压缩，详见视图中的Loader
    name: 'CreditStore', // 网站的名字
    description: '澳门积分俱乐部', // 网站的描述
    keywords: 'Aomen, Macao, Macau, CreditStore',
    // 添加到 html head 中的信息
    site_headers: [
        '<meta name="菊爆大队队长桶牛" content="895896936@qq.com" />'
    ],
    site_logo: '/public/images/cnodejs_light.svg', // default is `name`
    site_icon: '/public/images/cnode_icon_32.png', // 默认没有 favicon, 这里填写网址
    // 社区的域名
    host: '127.0.0.1',
    port: 18080,
    // 邮箱配置
    mail_opts: {
        host: "smtp.qq.com", // 主机
        port: 465, // SMTP 端口
        auth: {
            user: '895896936@qq.com',
            pass: 'emdzmmclpztobchg'
        }
    },
    // mongodb 配置
    db: 'mongodb://127.0.0.1/credit_store_dev',
    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,

    session_secret: 'credit_store_secret',
    auth_cookie_name: 'credit_store_cookie_name',
    cooke_max_age: 1000 * 60 * 60 * 24 * 30,

    admins: { user_login_name: true },

    //重置密码有效期
    reset_password_expire_time: 1000 * 60 * 60 * 24,
};

if (process.env.NODE_ENV === 'test') {
    config.db = 'mongodb://127.0.0.1/credit_store_test';
}

module.exports = config;

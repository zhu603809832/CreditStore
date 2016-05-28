module.exports = {
    session : {
        COOKIE_SECRET: 'creditstore.com',
        NAME: 'credit_store',
        URL: 'mongodb://127.0.0.1:27017/nodedb',
        DB: 'nodedb',
        HOST: '127.0.0.1',
        PORT: 27017,
        USERNAME: 'admin',
        PASSWORD: '123456'
    },
    account : {
            /*
            account 账号名
            password 密码
            wechat 微信
            mail 邮箱
            phone 手机
            createtime 账号创建时间（自动计算）
            */
            //{"test0001", "123456", "test0001", "test0001@163.com", "18319157139", null},
            DATA_FILE : "./data/account.txt",
            ACCOUNT_INDEX : 1,
            PASSWORD_INDEX : 2,
            WECHAT_INDEX : 3,
            MAIL_INDEX : 4,
            PHONE_INDEX : 5,
            CREATETIME_INDEX : 6,
        },
    user : {
            /*
            account 
            birthday 
            identity (student, worker, free worker, others)
            qq 
            credit 
            sex (male, female)
            exp 
            image
            */
            //{"test0001", "1989-03-01", 0, "895896936", 99999, 0, 999999999, null},
            DATA_FILE : "./data/user.txt",
            ACCOUNT_INDEX : 1,
            BIRTHDAY_INDEX : 2,
            SEX_INDEX : 3,
            IDENTITY_INDEX : 4,
            QQ_INDEX : 5,
            CREDIT_INDEX : 6,
            EXP_INDEX : 7,
        },
}

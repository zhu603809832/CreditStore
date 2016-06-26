//start service
//mongod --dbpath=e:\mongodb\db --logpath=e:\mongodb\log\log.log

//interactive shell
//mongo

//show dbs
//db.createCollection('account')
//db.account.insert({})

//db.createCollection('user')
module.exports = {
    database: { //database
        NAME: 'credit_store',
        URL: 'mongodb://127.0.0.1:27017/nodedb',
        DBNAME: 'nodedb',
        HOST: '127.0.0.1',
        PORT: 27017,
        USERNAME: 'admin',
        PASSWORD: '123456'
    },
    session: { //collection
        COOKIE_SECRET: 'creditstore.com',
        NAME: 'credit_store_session',
        URL: 'mongodb://127.0.0.1:27017/nodedb',
        USERNAME: 'admin',
        PASSWORD: '123456'
    },

    account: { //collection
        /*
        account 账号名
        password 密码
        wechat 微信
        mail 邮箱
        phone 手机
        createtime 账号创建时间（自动计算）
        */
        //{"account", "password", "wechat", "mail", "phone", "createtime"},
        COLLECTION_NAME : "account",
        DATA_FILE: "./data/account.txt",
        
        ACCOUNT_INDEX: 1,
        ACCOUNT_KEY: "account",

        PASSWORD_INDEX: 2,
        PASSWORD_KEY: "password",

        WECHAT_INDEX: 3,
        WECHAT_KEY: "wechat",

        MAIL_INDEX: 4,
        MAIL_KEY: "mail",

        PHONE_INDEX: 5,
        PHONE_KEY: "phone",

        CREATETIME_INDEX: 6,
        CREATETIME_KEY: "createtime",
    },
    user: { //collection
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
        //{"account", "birthday", "sex", "identity", "qq", 0, "credit", "exp"},
        DATA_FILE: "./data/user.txt",
        ACCOUNT_INDEX: 1,
        BIRTHDAY_INDEX: 2,
        SEX_INDEX: 3,
        IDENTITY_INDEX: 4,
        QQ_INDEX: 5,
        CREDIT_INDEX: 6,
        EXP_INDEX: 7,
        COLLECTION_NAME : "user",
    },
}

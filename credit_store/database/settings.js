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
    database: {
    	account:{
    		/*
			account 账号名
			password 密码
			wechat 微信
			mail 邮箱
			phone 手机
			createtime 账号创建时间（自动计算）
			*/
			//{"test0001", "123456", "test0001", "test0001@163.com", "18319157139", null},
			//{"test0002", "123456", "test0002", "test0002@163.com", "18319157139", null},
			//{"test0003", "123456", "test0003", "test0003@163.com", "18319157139", null},
    	},
    	user:{
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
    		//{"test0002", "1989-03-01", 0, "895896937", 99999, 0, 999999999, null},
    		//{"test0003", "1989-03-01", 0, "895896938", 99999, 0, 999999999, null},
    	},
    },
}

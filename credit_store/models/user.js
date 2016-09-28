var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;
var utility = require('utility');
var _ = require('lodash');

var UserSchema = new Schema({
    name: { type: String },
    loginname: { type: String },
    password: { type: String },
    email: { type: String },
    profile_image_url: { type: String },
    location: { type: String },
    signature: { type: String },
    profile: { type: String },
    phone: { type: String },
    weibo: { type: String },
    wechat: { type: String },
    avatar: { type: String },
    is_block: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    is_star: { type: Boolean },
    active: { type: Boolean, default: false },

    receive_reply_mail: { type: Boolean, default: false },
    receive_at_mail: { type: Boolean, default: false },

    retrieve_time: { type: Number },
    retrieve_key: { type: String },
    accessToken: { type: String },
});

UserSchema.plugin(BaseModel);
UserSchema.virtual('avatar_url').get(function () { //头像URL
  var url = this.avatar || ('https://gravatar.com/avatar/' + utility.md5(this.email.toLowerCase()) + '?size=48');

  // www.gravatar.com 被墙 
  url = url.replace('www.gravatar.com', 'gravatar.com');

  // 让协议自适应 protocol，使用 `//` 开头
  if (url.indexOf('http:') === 0) {
    url = url.slice(5);
  }

  return url;
});

UserSchema.virtual('isAdvanced').get(function () {
  // 积分高于 700 则认为是高级用户
  return this.score > 700 || this.is_star;
});

UserSchema.index({loginname: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});
UserSchema.index({score: -1});
UserSchema.index({accessToken: 1});
mongoose.model('User', UserSchema);
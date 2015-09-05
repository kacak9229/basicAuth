var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

  friends: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  facebook: {
    id: String,
    token: String,
    email: String,
    displayName: String,
    photo: String
  }
});

// 
// var FriendsRequest = new Schema({
//
//   madeBy: [{ type: Schema.Types.ObjectId, ref: 'User'}],
//
//
// })

module.exports = mongoose.model('User', UserSchema);

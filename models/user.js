var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var User = new Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String
  },
  instagram: {
    id: String,
    token: String,
    email: String,
    displayName: String,
    username: String,
    name: String,
    picture: String,
  }
});

User.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

User.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);

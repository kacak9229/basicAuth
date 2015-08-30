var mongoose = require('mongoose');

module.exports = {
  connect: function() {
    mongoose.connect('mongodb://root:root@ds035593.mongolab.com:35593/instagranauth', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to the database");
      }
    });
  }
}

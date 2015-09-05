var mongoose = require('mongoose');

module.exports = {
  connect: function() {
    mongoose.connect('mongodb://root:abc123@ds035553.mongolab.com:35553/facebook', function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to the database");
      }
    });
  }
}

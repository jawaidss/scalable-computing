
/**
 * Module dependencies.
 */

mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hello_world');

var UserSchema = new mongoose.Schema({
  username: String
})

var User = mongoose.model('User', UserSchema);

User.count(function(err, c) {
  if (c == 0) {
    var user = new User();
    user.username = 'jawaidss';
    user.save()
  }
});

exports.User = User;

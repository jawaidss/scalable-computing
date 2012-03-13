
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , mongooseAuth = require('mongoose-auth');

var TWITTER_CONSUMER_KEY = require('./settings.js').TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = require('./settings.js').TWITTER_CONSUMER_SECRET;

mongoose.connect('mongodb://localhost/hello_world');

var UserSchema = new mongoose.Schema({
  username: String
});

UserSchema.plugin(mongooseAuth, {
  everymodule: {
    everyauth: {
      User: function() {
        return User;
      }
    }
  },
  twitter: {
    everyauth: {
      myHostname: 'http://local.host:3000',
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      redirectPath: '/'
    }
  }
});

var User = mongoose.model('User', UserSchema);

User.count(function(err, c) {
  if (c == 0) {
    var user = new User();
    user.username = 'jawaidss';
    user.save()
  }
});

exports.User = User;

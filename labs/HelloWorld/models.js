
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , mongooseAuth = require('mongoose-auth');

var TWITTER_CONSUMER_KEY = require('./settings.js').TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = require('./settings.js').TWITTER_CONSUMER_SECRET;

mongoose.connect('mongodb://localhost/hello_world');

var StatusSchema = new mongoose.Schema({
  message: String
});

var UserSchema = new mongoose.Schema();
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

var Status = mongoose.model('Status', StatusSchema);
var User = mongoose.model('User', UserSchema);

Status.count(function(err, c) {
  if (c == 0) {
    var status = new Status();
    status.message = 'Hello, World';
    status.save()
  }
});

exports.Status = Status;

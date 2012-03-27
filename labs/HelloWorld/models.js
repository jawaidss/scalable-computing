
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , mongooseAuth = require('mongoose-auth')
  , fs = require('fs');

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

var CommentSchema = new mongoose.Schema({
    text : String
  , date : Date // timestamp
});

var PhotoSchema = new mongoose.Schema({
    path : String // src
  , description : String // alt
  , date : Date // timestamp
  , comments : [CommentSchema]
  , likes : Number
  , data : Buffer
});

var Status = mongoose.model('Status', StatusSchema);
var User = mongoose.model('User', UserSchema);
var Photo = mongoose.model('Photo', PhotoSchema);

Status.count(function(err, c) {
  if (c == 0) {
    var status = new Status();
    status.message = 'Hello, World';
    status.save();
  }
});

Photo.count(function(err, c) {
  if (c == 0) {
    var FOLDER = 'public/img/flickr-tmp';
    fs.readdir(FOLDER, function(err, files) {
      for (var i in files) {
        var file = files[i];
        var photo = new Photo();
        photo.path = FOLDER.replace(FOLDER.split('/')[0], '') + '/' + file;
        photo.description = file.split('.')[0];
        photo.date = new Date();
        photo.likes = 0;
        photo.save();
      }
    });
  }
});

exports.Status = Status;
exports.Photo = Photo;


/**
 * Module dependencies.
 */
mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hello_world');

/*
 * GET home page.
 */

exports.index = function(req, res){
  var User = mongoose.model('User');
  User.find(function(err, users) {
    res.render('index', { title: 'Express', users: users });
  });
};

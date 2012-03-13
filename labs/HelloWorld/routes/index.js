var User = require('../models').User;

/*
 * GET home page.
 */

exports.index = function(req, res){
  User.find(function(err, users) {
    res.render('index', { title: 'Express', users: users });
  });
};

/*
 * POST create user.
 */

exports.create_user = function(req, res){
  var user = new User();
  user.username = req.body.username;
  user.save()
  res.redirect('back');
};

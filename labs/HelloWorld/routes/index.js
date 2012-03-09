var User = require('../models').User;

/*
 * GET home page.
 */

exports.index = function(req, res){
  User.find(function(err, users) {
    res.render('index', { title: 'Express', users: users });
  });
};

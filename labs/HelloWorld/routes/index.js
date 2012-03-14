var Status = require('../models').Status;

/*
 * GET home page.
 */

exports.index = function(req, res) {
  Status.find(function(err, statuses) {
    res.render('index', { title: 'Home', statuses: statuses });
  });
};

/*
 * POST create status.
 */

exports.create_status = function(req, res) {
  var status = new Status();
  status.message = req.body.message;
  status.save()
  res.redirect('back');
};

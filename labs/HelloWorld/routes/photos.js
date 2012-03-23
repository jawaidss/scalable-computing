var Status = require('../models').Status;

/*
 * GET photos page.
 */

exports.all = function(req, res) {
  res.render('photos', { title: 'Photos' });
};


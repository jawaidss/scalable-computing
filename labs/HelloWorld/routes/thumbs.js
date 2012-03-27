var Photo = require('../models').Photo;

/*
 * GET photos page.
 */

exports.all = function(req, res) {
  Photo.find(function(err, photos) {
    res.render('thumbs', { title: 'Photos', photos: photos, stylesheet: 'thumbs.css' });
  });
};

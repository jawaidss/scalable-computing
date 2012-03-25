var Photo = require('../models').Photo;

/*
 * GET photos page.
 */

exports.all = function(req, res) {
  Photo.find(function(err, photos) {
    res.render('photos', { title: 'Photos', photos: photos, stylesheet: 'photos.css' });
  });
};

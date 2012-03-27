var Photo = require('../models').Photo;

/*
 * GET photos page.
 */

exports.all = function(req, res) {
  var page = parseInt(req.params.page) || 0; // :page or all (first page)
  var options;
  if (page == 0) { // first page is a special case
    options = {limit: 2};
  } else {
    options = {skip: page - 1, limit: 3};
  }
  Photo.find({}, ['path', 'description'], options, function(err, photos) {
    var n = photos.length;
    var context;
    if (n == 0) {
      context = {'left': null, 'center': null, 'right': null};
    } else if (n == 1) {
      context = {'left': null, 'center': photos[0], 'right': null};
    } else if (n == 2) {
      if (page == 0) { // first page is a special case
        context = {'left': null, 'center': photos[0], 'right': photos[1]};
      } else {
        context = {'left': photos[0], 'center': photos[1], 'right': null};
      }
    } else if (n == 3) {
      context = {'left': photos[0], 'center': photos[1], 'right': photos[2]};
    }
    context.page = page;
    context.title = 'Photos';
    context.stylesheet = 'photos.css';
    res.render('photos', context);
  });
};

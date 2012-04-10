var Photo = require('../models').Photo;

/*
 * GET photos page.
 */

exports.all = function(req, res) {
  var page = parseInt(req.params.page) || 0; // :page or all (first page)
  var tag = req.params.tag;
  var query = {};
  if (tag) {
    query = {tags: {$in: [tag]}};
  }
  var options;
  if (page == 0) { // first page is a special case
    options = {limit: 2};
  } else {
    options = {skip: page - 1, limit: 3};
  }
  options.sort = {description: 1};
  Photo.find(query, ['description', 'tags'], options, function(err, photos) {
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
    context.tag = tag;
    context.page = page;
    context.title = 'Photos';
    if (tag) {
      context.title += ' - ' + tag;
    }
    context.stylesheet = 'photos.css';
    res.render('photos', context);
  });
};

function get_photo(id, callback) {
    Photo.find({description:id}, function(err, photos) {
        if(photos.length == 0) {
            callback(undefined);
        } else {
            var photo = photos[0];

            if(typeof(photo.data) == "undefined") {
                var fs = require('fs');

                fs.readFile('./public/img/flickr-tmp/' + id + '.jpg', function(err, data) {
                    if(err) throw err;

                    photo.data = data;
                    photo.save(function(err) {
                        if(err) {
                            console.log("error saving; photo will reload next fetch");
                        }
                    });

                    callback(photo);
                });
            } else {
                callback(photo);
            }
        }
    });
}

exports.photo = function(req, res) {
    var id = req.params.id || "";
    var photo = get_photo(id, function(photo) {
        if(typeof(photo) == "undefined") {
            console.log("no photo");
        } else {
            res.send(photo.data);
        }
    });
};

exports.thumb = function(req, res) {
    var id = req.params.id || "";
    var photo = get_photo(id, function(photo) {
        if(typeof(photo) == "undefined") {
            return;
        }

        var im = require('imagemagick');
        var tdata = im.resize({
            srcData: photo.data,
            width: 256
        }, function(err, stdout, stderr) {
            if(err) throw err;
            res.send(stdout);
        });
    });
};

var Photo = require('../models').Photo;

var fs = require('fs');

exports.test = function(req, res) {
    fs.readFile('./public/img/flickr-tmp/00010.jpg', function(err, data) {
        Photo.find({}, function(err, photos) {
            photos.forEach(function(photo) {
                photo.data = data;
                photo.save();
            });
            res.send(photos[0].data);
        });
    });
}

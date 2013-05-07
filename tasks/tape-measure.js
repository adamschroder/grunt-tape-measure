/*globals require*/
module.exports = function  (grunt) {

  'use strict';

  var imageMagick = require('imagemagick');
  var async = require('async');
  var glob = require('glob');
  var path = require('path');

  function buildImage (options, data, callback) {

    var image = data.image;
    var size = data.size;

    var srcPath = path.join(options.sourceDir, image);
    var destPath = path.join(options.baseDir, size, image);

    imageMagick.resize({
      'srcPath': srcPath,
      'dstPath': destPath,
      'width': size,
      'quality': options.quality,
      'format': options.format,
      'progressive': options.progressive
    }, function (err) {

      if (err) {
        handleError(err);
      }

      grunt.log.ok('\u2713'.green, image, size + 'px');
      callback(null, destPath);
    });
  }

  function buildImages (options, callback) {

    glob(options.glob, {
      'cwd': options.sourceDir
    }, function(err, images) {

      if (err) {
        handleError(err);
      }

      var builders = [];

      grunt.log.ok(images.length, 'Images found');

      // For each source image
      images.forEach(function (image) {

        // Except the ones explicitely excluded
        if (options.excluded.indexOf(image) > -1) {
          return;
        }

        // For each size defined in the config
        options.sizes.forEach(function (size) {

          // Generate a new image
          builders.push({
            'image': image,
            'size': size + ''
          });
        });
      });

      // run a parallel build
      async.mapSeries(builders, buildImage.bind(null, options), callback);
    });
  }

  function handleError (err) {

    grunt.log.error(err);
    grunt.fatal();
  }

  grunt.registerTask('tape-measure', function () {

    var done = this.async();
    var target = this.target;

    var options = this.options({
      'srcDir':'../',
      'excluded': [],
      'sizes': [640, 768, 1024, 2048],
      'quality': 0.8,
      'progressive': false,
      'format':'jpg',
      'glob':'**/*.jpg'
    });

    buildImages(options, function () {
      done();
    });
  });
};

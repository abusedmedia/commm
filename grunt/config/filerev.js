'use strict';

var path = require('path');

module.exports = function (grunt, options) {

  // this is the grunt configuration object
  return {

    options: {
      algorithm: 'md5',
      length: 6
    },
    dist: {
      src: [
        path.join(options.folders.dist, 'css/app.css'),
        path.join(options.folders.dist, 'css/vendor.css'),
        path.join(options.folders.dist, 'js/app.js'),
        path.join(options.folders.dist, 'js/vendor.js'),
      ],
      // dest: options.folders.dist,
    }

  };

};

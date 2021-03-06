'use strict';

var path = require('path');

module.exports = function (grunt, options) {

  // this is the grunt configuration object
  return {

    app:{
      files:[
        {
          expand: true,
          cwd: options.folders.dev,
          src: ['**/*'], 
          dest: path.join(options.folders.app, '')
        }
      ]
    },

    ver:{
      files:[
        {
          expand: true,
          cwd: options.folders.dev,
          src: ['**/*'], 
          dest: path.join(options.folders.app, options.version)
        }
      ]
    },

    dist: {
      files: [
        {
          expand: true,
          cwd: options.folders.app,
          src:  ['*.html', '**/*.html', '!vendor/**/*.html'],
          dest: options.folders.dist
        },
        {
          expand: true,
          cwd: options.folders.app,
          src:  path.join('assets', 'imgs', '*.{jpg,png,bmp,gif}'),
          dest: path.join(options.folders.dist)
        },
        {
          expand: true,
          cwd: options.folders.app,
          src:  path.join('assets', 'fonts', '*'),
          dest: path.join(options.folders.dist)
        }
      ]
    },

  };

};

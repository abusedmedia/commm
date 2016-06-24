'use strict';

var path = require('path');

module.exports = function (grunt, options) {

  // this is the grunt configuration object
  return {

    options: {
      sourceMap: false,
      sourceMapIn: function(uglifySource) {
        return uglifySource + '.map';
      },
    },
    generated: {
      mangle:    true,  // invert for debug
      beautify:  false, // invert for debug
      sourceMap: false   // generated source maps for debug
    }

  };

};

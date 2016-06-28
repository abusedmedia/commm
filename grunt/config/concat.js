'use strict';

var path = require('path');

module.exports = function (grunt, options) {

  // this is the grunt configuration object
  return {

    options: {
      sourceMap: true
    },

    sandbox:{
    	options:{
      		sourceMap: false,
    		separator: ';'
    	},
    	src: [path.join(options.folders.dev, 'sandbox_config.js'), path.join(options.folders.dist, 'commm.js')],
    	dest: path.join(options.folders.dist, 'public_commm.js'),
    }

  };

};

'use strict';

var grunt = require('grunt');
var path = require('path');
var fs = require('fs');

module.exports = function () {

	var rootPath = grunt.config('rootPath')
    var folders = grunt.config('folders');
	var version = grunt.config('version')

	var file = grunt.file.read(path.join(folders.dev, 'style.css')).replace(/[\n\r]+/g, '');

	var str = ';(function(){\n$("head").append("<style>'+file+'</style>");\n})();'

	grunt.file.write(path.join(folders.dev, 'style.js'), str);

};
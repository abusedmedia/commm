'use strict';

var grunt = require('grunt');
var path = require('path');
var fs = require('fs');

module.exports = function () {

	var rootPath = grunt.config('rootPath')
    var folders = grunt.config('folders');
	var version = grunt.config('version')

	var css = grunt.file.read(path.join(folders.dev, 'style.css')).replace(/[\n\r]+/g, '');

	var str = ';(function(){\n$("head").append("<style>'+css+'</style>");\n})();'

	grunt.file.write(path.join(folders.app, 'style.js'), str);


	var html = grunt.file.read(path.join(folders.dev, 'template.html')).replace(/[\n\r]+/g, '');

	var str = ';(function(){\n$("body").append(\''+html+'\');\n})();'

	grunt.file.write(path.join(folders.app, 'template.js'), str);

};
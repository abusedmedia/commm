module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: 'app/assets/scss/*.scss',
            tasks: ['sass']
        },
        sass: {
            dist: {                            // Target
		      options: {                       // Target options
		        style: 'expanded'
		      },
		      files: [{
		        expand: true,
		        cwd: 'app/assets/scss',
		        src: ['*.scss'],
		        dest: 'app/assets/css/',
		        ext: '.css'
		      }]
		    }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'app/assets/css/*.css',
                        'app/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './app',
                    open:false
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // define default task
    grunt.registerTask('gruntsassdev', ['browserSync', 'watch']);
};
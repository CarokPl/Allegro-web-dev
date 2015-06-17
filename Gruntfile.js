module.exports = function (grunt) {


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        less: {
            development: {
                files: {
                    "css/dist/styles.css": "css/source/index.less"
                }
            }
        },
        watch: {
            css: {
                files: ['css/source/**/*.less'],
                tasks: ['less']
            },
            scripts: {
                files: ['js/*.js', 'js/**/*.js'],
                tasks: ['uglify']
            }
        },
        uglify: {
            my_target: {
                files: {
                    'js/dest/output.min.js': ['js/*.js', 'js/user/*.js'],
                    'js/dest/admin.min.js': ['js/*.js', 'js/admin/*.js']
                }
            }

        }
    });
}
module.exports = function (grunt) {


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.initConfig({
        less: {
            development: {
                files: {
                    "css/style.css": "less/source/index.less",
                    "css/bootstrap.css": "less/bootstrap/bootstrap.less",
                    "css/font-awesome.css": "less/font-awesome/font-awesome.less"
                },
                options: {
                    compress: "true"
                }
            }
        },
        watch: {
            less: {
                files: ['less/source/*.less',
                        'less/bootstrap/*.less', 'less/bootstrap/bootstrap/*.less', 
                        'less/font-awesome/*.less', 'less/font-awesome/font-awesome/*.less'],
                tasks: ['less'],
            }
        }

    });
}
module.exports = function (grunt) {


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.initConfig({
        less: {
            development: {
                files: {
                    "css/dist/style.css": "css/source/index.less",
                    "css/dist/bootstrap.css": "css/bootstrap/bootstrap.less",
                    "css/dist/font-awesome.css": "css/font-awesome/font-awesome.less"
                }
            }
        },
        watch: {
            less: {
                files: ['css/source/*.less',
                        'css/bootstrap/*.less', 'css/bootstrap/bootstrap/*.less', 
                        'css/font-awesome/*.less', 'css/font-awesome/font-awesome/*.less'],
                tasks: ['less'],
            }
        }

    });
}
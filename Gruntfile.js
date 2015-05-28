module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

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
                tasks: ['less'],
            }
        },

    });
}
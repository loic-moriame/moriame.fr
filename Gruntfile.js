module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['css/*.css']
      },
      js: {
        files: ['js/*.js']
      },
      html: {
        files: ['*.html']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};
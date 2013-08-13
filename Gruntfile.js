module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      html: {
        dest: 'public/'
      },
      js: {
        dest: 'public/js/'
      },
      css: {
        src: {
          base: 'src/css/',
          basic: ['<%= config.css.src.base %>/bootstrap.css', '<%= config.css.src.base %>/font-awesome.css', '<%= config.css.src.base %>/style.css'],
          ie7: ['<%= config.css.src.base %>/bootstrap.css', '<%= config.css.src.base %>/font-awesome.css', '<%= config.css.src.base %>/font-awesome-ie7.css', '<%= config.css.src.base %>/style.css'],
        },
        dest: {
          base: 'public/css/',
          basic: '<%= config.css.dest.base %>style.css',
          ie7: '<%= config.css.dest.base %>/style-ie7.css',
        },
      },
      font: {
        dest: 'public/font/'
      }
    },

    concat: {
      options: {},
      basic: {
        src: ['<%= config.css.src.basic %>'],
        dest: '<%= config.css.dest.basic %>',
      },
      ie7: {
        src: ['<%= config.css.src.ie7 %>'],
        dest: '<%= config.css.dest.ie7 %>',
      },
    },
    
    cssmin: {
      basic: {
        keepSpecialComments: 0,
        files: {
          '<%= config.css.dest.base %>style.min.css': ['<%= config.css.dest.basic %>']
        }
      },
      ie7: {
        keepSpecialComments: 0,
        files: {
          '<%= config.css.dest.base %>style-ie7.min.css': ['<%= config.css.dest.ie7 %>']
        }
      }
    },

    manifest: {
      generate: {
        options: {
          basePath: 'public/',
          network: ['http://*', 'https://*'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['<%= config.html.dest %>index.html'],
          cache: ['font/fontawesome-webfont.woff?v=3.2.1', 'font/fontawesome-webfont.ttf?v=3.2.1', 'font/fontawesome-webfont.svg#fontawesomeregular?v=3.2.1']
        },
        src: [
          '*.html',
          '*.pdf',
          'js/*.min.js',
          'css/*min.css',
          'font/ubuntu/*',
          'font/*'
        ],

        dest: 'public/manifest.appcache'
      }
    },

    watch: {
      files: ['<%= config.css.src.basic %>', '<%= config.css.src.ie7 %>', 'public/*.html', 'Gruntfile.js'],
      tasks: ['concat','cssmin', 'manifest'],
      options: {
        livereload: true,
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-manifest');
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'cssmin', 'manifest', 'watch']);
  grunt.registerTask('compress', ['concat', 'cssmin']);

};
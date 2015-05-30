module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'ng-alertify.js'
      ],
      specs: ['test/*-spec.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    sync: {
      all: {
        options: {
          sync: ['author', 'name', 'version', 'main',
            'private', 'license', 'keywords', 'homepage'],
        }
      }
    },

    concat: {
      options: {
        banner: '/**\n' +
          ' <%= pkg.name %>@<%= pkg.version %>\n' +
          ' <%= pkg.description %>\n' +
          ' <%= pkg.author %>\n' +
          ' <%= pkg.homepage %>\n' +
          '*/\n\n',
        process: function(src, filepath) {
          if (/\.css$/.test(filepath)) {
            return '/* CSS ' + filepath + ' */\n' + src;
          } else {
            return src;
          }
        }
      },
      css: {
        src: ['bower_components/alertify.js/themes/alertify.core.css',
          'bower_components/alertify.js/themes/alertify.default.css'
        ],
        dest: 'dist/ng-alertify.css'
      },
      js: {
        src: ['bower_components/alertify.js/lib/alertify.js', 'ng-alertify.js'],
        dest: 'dist/ng-alertify.js'
      },
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    },

    watch: {
      options: {
        atBegin: true
      },
      all: {
        files: ['*.js', 'test/*.js', 'package.json'],
        tasks: ['jshint', 'concat', 'test']
      }
    },

    'gh-pages': {
      options: {
        base: '.'
      },
      src: [
        'README.md',
        'ng-alertify.js',
        'index.html',
        'node_modules/es5-shim/es5-shim.js',
        'bower_components/angular/angular.js',
        'bower_components/alertify.js/lib/alertify.js',
        'bower_components/alertify.js/themes/alertify.core.css',
        'bower_components/alertify.js/themes/alertify.default.css'
      ]
    }
  });

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', ['karma']);
  grunt.registerTask('default',
    ['nice-package', 'deps-ok', 'sync', 'jshint', 'concat', 'test']);
};

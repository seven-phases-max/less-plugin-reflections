'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.initConfig({

        less: {
            options: {
                plugins: [new (require('../less-plugin-reflections'))()]
            },
            regression: {

            }
        },

        jshint: {
            options: {
                jshintrc: 'test/.jshintrc'
            },
            src: [
                'lib/*.js',
                'Gruntfile.js',
                'test/compare.js'
            ],
        },

        clean: ['test/tmp']

    });

    grunt.registerTask('regression', [
        'clean',
        'less:regression'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'regression'
    ]);

    grunt.registerTask('default', ['test']);

};

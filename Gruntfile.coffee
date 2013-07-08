module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        typescript:
            compile:
                src: ['dddbase.ts']
                dest: 'dddbase.js'
                options:
                    module: 'commonjs'
                    target: 'es3'
                    # sourcemap: true
                    declaration: true

            test:
                src: ['test/**/*.ts']
                dest: 'compiled'
                options:
                    module: 'commonjs'
                    target: 'es3'

        clean:
            type:
                src: ['compiled/**/*.js', 'compiled/*']
            build:
                src: ['build/**/*.js']

        concat:
            dist:
                src: ['compiled/src/dddbase.js']
                dest: 'build/dddbase.js'
            options:
                separator: ';'

        uglify:
            min:
                files:
                    'dddbase.min.js': ['dddbase.js']
            ###
            options:
                mangle:
                    expect: ['jQuery']
                sourceMap: 'build/source-map.js'
            ###

        connect:
            preview:
                options:
                    port: 9000
                    base: 'public'

        regarde:
            src:
                files: ['src/**/*.*']
                tasks: ['generate']

    grunt.loadNpmTasks 'grunt-typescript'
    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-regarde'
    grunt.loadNpmTasks 'grunt-exec'

    grunt.registerTask 'compile', ['typescript']
    grunt.registerTask 'default', ['compile']
    grunt.registerTask 'build', ['typescript:compile', 'concat', 'uglify']


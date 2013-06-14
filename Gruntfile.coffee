tsc = "~/.typescript/bin/tsc"

module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        exec:
            compile:
                cmd: -> "#{tsc} --out compiled/src/dddbase.js --declaration src/dddbase.ts"
            test:
                cmd: -> "#{tsc} --out compiled/test test/*.ts"

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
                    'build/dddbase.min.js': ['build/dddbase.js']
            ###
            options:
                mangle:
                    expect: ['jQuery']
                sourceMap: 'build/source-map.js'
            ###

        copy:
            build:
                files: [
                        expand: true
                        cwd: 'compiled/src'
                        src: '**.d.ts'
                        dest: 'build/'
                ]
            dts:
                files: [
                        expand: true
                        cwd: 'components/katana'
                        src: 'katana.d.ts'
                        dest: 'definitions/katana'
                ]

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

    grunt.registerTask 'compile', ['exec:compile', 'exec:test']
    grunt.registerTask 'default', ['compile']
    grunt.registerTask 'build', ['exec:compile', 'concat', 'uglify', 'copy:build']


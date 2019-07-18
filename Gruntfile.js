module.exports = function (grunt) {
    /*
      Do grunt-related things in here
      npm install --save-dev load-grunt-tasks
      npm install grunt-contrib-watch --save-dev
      order to use grunt you need to use grunt, grunt watch or grunt build
    */
    require('load-grunt-tasks')(grunt);
    const mozjpeg = require('imagemin-mozjpeg');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.initConfig({
        babel: {
            options: {
                sourceMap: false,
                presets: ['env']
            },
            dist: {
                files: {
                    'src/ES5/main.js': 'src/js/main.js',
                    'src/ES5/utils/animations.js': 'src/js/utils/animations.js',
                },
            },
        },
        sass: {
            options: {
                sourceMap: false,
            },
            dist: {
                files: {
                    'src/css/style.css': 'src/scss/main.scss',
                },
            },
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: { // Dictionary of files
                    // 'destination': 'source'
                    'public/index.html': 'src/index.html',
                    'public/privacy.html': 'src/privacy.html'
                },
            },
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['css/*.css', '!*.min.css'],
                    dest: 'public/',
                    ext: '.min.css',
                }, ],
            },
        },
        copy: {
            Game: {
                expand: true,
                cwd: 'src/',
                src: 'img/**',
                dest: 'public/',
            },
            Vendor: {
                expand: true,
                cwd: 'src/',
                src: 'js/vendor/*.js',
                dest: 'public/',
            },
            Fonts: {
                expand: true,
                cwd: 'src/',
                src: 'fonts/**',
                dest: 'public/',
            },
        },
        uglify: {
            target: {
                files: {
                    'public/js/app.js': ['src/js/vendor/*.js','src/ES5/utils/animations.js', 'src/ES5/main.js'],
                },
            },
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{
                        removeViewBox: false
                    }],
                    progressive: true,
                    use: [mozjpeg()] // Example plugin usage
                },
                files: {
                    
                }
            },
            dynamic: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{
                        removeViewBox: false
                    }],
                    progressive: true,
                    use: [mozjpeg()] // Example plugin usage
                },
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/img'
                }]
            }
        },
        watch: {
            css: {
                files: ['src/scss/*.scss', 'src/scss/**/*.scss'],
                tasks: ['sass'],
            },
            cssmin: {
                files: ['src/css/style.css'],
                tasks: ['cssmin'],
            },
            js: { 
                files: ['src/js/*.js', 'src/js/**/*.js'],
                tasks: ['babel'],
            },
            ES5: { 
                files: ['src/ES5/*.js', 'src/ES5/**/*.js'],
                tasks: ['uglify'],
            },
            html: {
                files: ['src/*.html'],
                tasks: ['htmlmin'],
            },
            copy: {
                files: ['src/img/**', 'src/fonts/**'],
                tasks: ['copy'],
            },
        },
    });
    grunt.registerTask('default', ['babel', 'sass', 'htmlmin', 'cssmin', 'uglify', 'copy', 'watch']);
    grunt.registerTask('build', ['babel', 'sass', 'htmlmin', 'cssmin', 'uglify', 'copy', 'imagemin']);
};

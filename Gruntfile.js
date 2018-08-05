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
                    /*
                    'public/js/GameEngine.js': 'public/js/GameEngine.js',
                    'public/js/ImageGenerator.js': 'public/js/ImageGenerator.js',
                    'public/js/Images.js': 'public/js/Images.js',
                    'public/js/InverseMatrix.js': 'public/js/InverseMatrix.js',
                    'public/js/Level.js': 'public/js/Level.js',
                    'public/js/View.js': 'public/js/View.js',
                    'public/js/Game.js': 'public/js/Game.js',
                    'public/js/main.js': 'public/js/main.js',
                    */
                    'public/js/app.js': ['src/js/utils/animations.js', 'src/ES5/main.js'],
                    /*
                    'public/js/vendor/bootstrap.min.js': 'src/js/vendor/bootstrap.min.js',
                    'public/js/vendor/jquery-3.3.1.slim.min.js': 'src/js/vendor/jquery-3.3.1.slim.min.js',
                    'public/js/vendor/jquery.min.js': 'src/js/vendor/jquery.min.js',
                    'public/js/vendor/popper.min.js': 'src/js/vendor/popper.min.js',
                    */
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
            js: { //all LPs share the same footer.js!
                files: ['src/js/*.js', 'src/js/**/*.js'],
                tasks: ['babel'],
            },
            ES5: { //all LPs share the same footer.js!
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

let gulp = require('gulp')
let jshint = require('gulp-jshint')
let nodemon = require('gulp-nodemon')
let clean = require('gulp-clean');

let jshintOptions = {
    esversion: 6,
    asi : true,
    unused: true,
    varstmt: true,
    evil: true
}

gulp.task('jshint', function(){
    return gulp.src('routes/*.js')
        .pipe(gulp.src('libs/*.js'))
        .pipe(jshint(jshintOptions))
        .pipe(jshint.reporter('default'))
})

gulp.task('develop', function() {
    nodemon({ 
        script: 'bin/www',
        ext: 'js',
        tasks: ['jshint'] 
    })
    .on('restart', function () {
        console.log('restarted!')
    })
})

// Tasks para o processo de build

gulp.task('build:clean', function(){
    return gulp.src('build')
        .pipe(clean());
})

gulp.task('build:copy', ['build:clean'], function(){
    gulp.src([
        '!test/*',
        '!gulpfile.js',
        '!nodemon.json',
        '!README.md',
        '**/*'
    ])
    .pipe(gulp.dest('build/'))
})

gulp.task('build', ['build:copy'])

gulp.task('default', ['develop'])

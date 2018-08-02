
var gulp = require('gulp')
var jshint = require('gulp-jshint')
var nodemon = require('gulp-nodemon')


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

gulp.task('develop', function () {
    nodemon({ 
        script: 'bin/www',
        ext: 'js',
        tasks: ['jshint'] })
    .on('restart', function () {
    console.log('restarted!')
    })
  })

gulp.task('default', ['develop'])

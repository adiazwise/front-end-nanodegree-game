var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

gulp.task('watch', function() {
    watch(['./js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
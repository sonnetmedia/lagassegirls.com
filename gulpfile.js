'use strict';

var gulp     = require('gulp'),
    concat   = require('gulp-concat'),
    jshint   = require('gulp-jshint'),
    minify   = require('gulp-minify-css'),
    rename   = require('gulp-rename'),
    sass     = require('gulp-sass'),
    uglify   = require('gulp-uglify'),
    neat     = require('node-neat').includePaths,
    watch = require('gulp-watch');

var CSSDest = './static/css/', 
    JSDest = './static/js/';

gulp.task('styles', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sass({
            includePaths: ['styles'].concat(neat)
        }))
        // This will output the non-minified version
    .pipe(gulp.dest(CSSDest))
    // This will minify and rename to foo.min.js
    .pipe(minify())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(CSSDest));
});

gulp.task("lint", function() {
    gulp.src("./javascript/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task('scripts', function() {
  return gulp.src( ['./javascript/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(JSDest))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(JSDest));
});

gulp.task('scripts-concat', function() {
  return gulp.src(
      [
        './bower_components/jquery/dist/jquery.min.js',
         './html/assets/js/scripts.min.js'
      ])
    .pipe(concat('scripts-concatenated.min.js')) //change this to change the script found in 'templates/global/_scripts.html'
    .pipe(gulp.dest(JSDest))
});

gulp.task('watch', function() {
  gulp.watch([
    'sass/**/*',
    'javascript/*'
  ], ['default']);
});


gulp.task('default',function(){
    gulp.start('styles', 'lint', 'scripts', 'scripts-concat');
});



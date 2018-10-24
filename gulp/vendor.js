// Gulp Requires
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

// vendor
gulp.task('vendor', () => {
  // jQuery
  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/vendor/jquery/'));
  // Font-Awesome
  gulp.src([
    'node_modules/font-awesome/**/font-awesome.min.css',
    'node_modules/font-awesome/**/fonts/*'
  ]).pipe(gulp.dest('dist/vendor/font-awesome/'))
});

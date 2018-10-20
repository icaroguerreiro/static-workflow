// Gulp Requires
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const bulksass = require('gulp-sass-bulk-import');

// vendor
gulp.task('vendor', ['vendor-copy', 'vendor-css']);

// vendor-copy
gulp.task('vendor-copy', () => {
  // jQuery
  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/vendor/jquery/'));
  // Font-Awesome
  gulp.src([
    'node_modules/font-awesome/**/font-awesome.min.css',
    'node_modules/font-awesome/**/fonts/*'
  ]).pipe(gulp.dest('dist/vendor/font-awesome/'))
});

// vendor-css
gulp.task('vendor-css', () => {
  // Sanitize
  gulp.src('node_modules/sanitize.css/sanitize.css')
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', (err) => console.log(err))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/vendor/sanitize/'));

  // Bootstrap
  gulp.src('src/vendor/bootstrap/bootstrap.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', (err) => console.log(err))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/vendor/bootstrap/css/'));
});

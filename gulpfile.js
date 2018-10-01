// Gulp Requires
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var browsersync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var copy = vendorcopy = require('gulp-copy');



// Sass + Autoprefixer + Sourcemap + Minify (Css)
gulp.task('sass', function() {
  return gulp.src('src/css/**/[!_]*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browsersync.stream());
});

// Pug (Html)
gulp.task('pug', function() {
  return gulp.src('src/**/[!_]*.pug')
    .pipe(pug({pretty: false}))
    .pipe(gulp.dest('dist/'))
    .pipe(browsersync.stream());
});

// Concat + Sourcemap + Uglify (Javascript)
gulp.task('scripts', function() {
  return gulp.src('src/js/**/[!_]*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(browsersync.stream());
});

// Watch
gulp.task('watch', function() {
  gulp.watch('src/css/**/[!_]*.sass', ['sass']);
  gulp.watch('src/js/**/[!_]*.js', ['scripts']);
  gulp.watch('src/**/[!_]*.pug', ['pug']);
});



// Vendor Related
gulp.task('vendor', ['vendorcopy', 'vendorsass']);

// Vendor Copy Files
gulp.task('vendorcopy', function() {
  
  // jQuery
  gulp.src([
      'node_modules/jquery/dist/jquery.min.js'
  ]).pipe(gulp.dest('dist/vendor/jquery/'));

  // Font-Awesome
  gulp.src([
      'node_modules/font-awesome/**/font-awesome.min.css',
      'node_modules/font-awesome/**/fonts/*'
  ]).pipe(gulp.dest('dist/vendor/font-awesome/'))

});

// Vendor Sass Build
gulp.task('vendorsass', function() {

  // Sanitize
  gulp.src([
    'node_modules/sanitize.css/sanitize.css'
    ])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/vendor/sanitize/'));

  // Bootstrap
  gulp.src([
    'src/vendor/bootstrap/bootstrap.sass'
    ])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/vendor/bootstrap/css/'));
});



// Browser Sync
gulp.task('browsersync', function () {
  browsersync({server:{baseDir:'dist/'}})
})

// Gulp Default
gulp.task('default', ['pug', 'sass', 'scripts', 'vendor', 'watch', 'browsersync']);

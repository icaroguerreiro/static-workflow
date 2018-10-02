// Gulp Requires
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const browsersync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const copy = vendorcopy = require('gulp-copy');
const pugIncludeGlob = require('pug-include-glob');



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
    .pipe(pug({pretty: true, plugins: [pugIncludeGlob()] }))
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
  gulp.watch('src/css/**/*.sass', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/**/*.pug', ['pug']);
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

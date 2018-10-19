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
const pugincludeglob = require('pug-include-glob');
const bulksass = require('gulp-sass-bulk-import');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

// Sass + Autoprefixer + Sourcemap + Minify (Css)
gulp.task('sass', () => {
  return gulp.src('src/css/**/[!_]*.sass')
    .pipe(bulksass())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

// Pug (Html)
gulp.task('pug', () => {
  return gulp.src('src/**/[!_]*.pug')
    .pipe(pug({pretty: true, plugins: [pugincludeglob()] }))
    .pipe(gulp.dest('dist/'));
});

// Concat + Sourcemap + Uglify (Javascript)
gulp.task('scripts', () => {
  return gulp.src('src/js/**/[!_]*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'));
});

// Assets Copy & Image Soft Compress
gulp.task('assets', () => {
  // Copy Assets
  gulp.src(['src/assets/**/*', '!src/assets/img/*'])
    .pipe(gulp.dest('dist/assets/'));
  // // Image Soft Compress
  gulp.src('src/assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img/'));
});

// Watch
gulp.task('watch', () => {
  // Just Files
  gulp.watch('src/css/**/*.sass', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/assets/**/*', ['assets']);
  gulp.watch('src/**/*.pug', ['pug']);
});



// Vendor Related
gulp.task('vendor', ['vendorcopy', 'vendorsass']);

// Vendor Copy Files
gulp.task('vendorcopy', () => {
  
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
gulp.task('vendorsass', () => {

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

// Gulp Default
gulp.task('default', ['pug', 'sass', 'scripts', 'assets', 'vendor', 'watch'], () => {
  browsersync({server:{baseDir:'dist/'}, open: false, ui: false, watch: true})
});

// Gulp Requires
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
const browsersync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const pugincludeglob = require('pug-include-glob');
const bulksass = require('gulp-sass-bulk-import');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');


// app
gulp.task('app', ['app-css', 'app-html', 'app-js', 'app-assets', 'app-watch']);

// app-css
gulp.task('app-css', () => {
  gulp.src(['src/css/**/[!_]*.sass', 'src/css/**/[!_]*.scss'])
    .pipe(bulksass())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed' //nested or compressed
    }))
    .on('error', (err) => console.log(err))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

// app-html
gulp.task('app-html', () => {
  gulp.src('src/**/[!_]*.pug')
    .pipe(pug({
      pretty: false,
      plugins: [pugincludeglob()] 
    }))
    .on('error', (err) => console.log(err))
    .pipe(gulp.dest('dist/'));
});

// app-js
gulp.task('app-js', () => {
  gulp.src('src/js/**/[!_]*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      minified: true,
      comments : false,
      presets: ['@babel/env']
    }))
    .on('error', (err) => console.log(err))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'));
});

// app-assets
gulp.task('app-assets', () => {
  gulp.src(['src/assets/**/*', '!src/assets/img/*'])
    .pipe(gulp.dest('dist/assets/'));
  gulp.src('src/assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img/'));
});

// app-watch
gulp.task('app-watch', () => {
  gulp.watch(['src/css/**/*.sass', 'src/css/**/*.scss'], ['app-css']);
  gulp.watch('src/js/**/*.js', ['app-js']);
  gulp.watch('src/assets/**/*', ['app-assets']);
  gulp.watch('src/**/*.pug', ['app-html']);
});



// vendor
gulp.task('vendor', ['vendor-copy', 'vendor-css']);

// vendor-copy
gulp.task('vendor-copy', () => {
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

// Gulp Default
gulp.task('default', ['app', 'vendor'], () => {
  browsersync({
    server:{baseDir:'dist/'},
    open: false,
    ui: false,
    watch: true
  })
});

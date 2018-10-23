// Gulp Requires
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
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
  // Bundle
  gulp.src('src/js/bundle/**/[!_]*.js')
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
  // Singles
  gulp.src('src/js/singles/**/[!_]*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      minified: true,
      comments : false,
      presets: ['@babel/env']
    }))
    .on('error', (err) => console.log(err))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/singles/'));
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

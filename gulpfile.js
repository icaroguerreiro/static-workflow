// gulp
const gulp = require('gulp')
const pug = require('gulp-pug')
const pugGlob = require('pug-include-glob')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const imagemin = require('gulp-imagemin')
const watch = require('gulp-watch')
const browsersync = require('browser-sync')

// app
gulp.task('app', ['app-css', 'app-js', 'app-html', 'app-assets', 'app-watch'])

// app-css
gulp.task('app-css', () => {
  gulp.src(['src/core/css/thirds.sass', 'src/core/css/style.sass'])
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(concat("style.css"))
      .pipe(cleanCSS( {level: {1: {compatibility: 'ie8', specialComments: 0}}} ))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/core/css'))
    .on('error', (err) => console.log(err))
})

// app-js
gulp.task('app-js', () => {
  // Bundle
  gulp.src(['src/core/js/**/[!_@]*.js','src/components/**/[!_@]*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('bundler.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/core/js'))
    .on('error', (err) => console.log(err))

  // Singles
  gulp.src(['src/core/js/**/[@]*.js','src/components/**/[@]*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/core/js'))
    .on('error', (err) => console.log(err))

  // Duplicates
  gulp.src(['src/core/js/**/[#]*.js','src/components/**/[#]*.js'])
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('dist/core/js'))
    .on('error', (err) => console.log(err))
})

// app-html
gulp.task('app-html', () => {
  gulp.src('src/**/[!_]*.pug')
    .pipe(pug({
      pretty: false,
      plugins: [pugGlob()] 
    }))
    .pipe(gulp.dest('dist/'))
    .on('error', (err) => console.log(err))
})

// app-assets
gulp.task('app-assets', () => {
  gulp.src(['src/assets/**/*.*', '!src/assets/img/*.*'])
    .pipe(gulp.dest('dist/assets/'))
  gulp.src('src/assets/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img/'))
})

// app-watch
gulp.task('app-watch', () => {
  gulp.watch(['src/core/css/**/*.sass', 'src/components/**/*.sass'], ['app-css'])
  gulp.watch(['src/core/js/**/*.js','src/components/**/*.js'], ['app-js'])
  gulp.watch('src/assets/**/*', ['app-assets'])
  gulp.watch('src/**/*.pug', ['app-html'])
})

// vendor
gulp.task('vendor-copy', () => {
  // jQuery
  // gulp.src('node_modules/jquery/dist/jquery.min.js')
  //   .pipe(gulp.dest('dist/vendor/jquery/'));
  // Font-Awesome
  gulp.src([
    'node_modules/font-awesome/**/font-awesome.min.css',
    'node_modules/font-awesome/**/fonts/*'
  ]).pipe(gulp.dest('dist/vendor/font-awesome/'))
});

// Gulp Default & Server
gulp.task('default', ['app', 'vendor-copy'], () => {
  browsersync({
    server:{baseDir:'dist/'},
    open: false,
    ui: false,
    watch: true
  })
});

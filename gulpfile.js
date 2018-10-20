// Gulp Requires
const gulp = require('gulp');
const browsersync = require('browser-sync');

require('./gulp/app')
require('./gulp/vendor')

// Gulp Default & Server
gulp.task('default', ['app', 'vendor'], () => {
  browsersync({
    server:{baseDir:'dist/'},
    open: false,
    ui: false,
    watch: true
  })
});

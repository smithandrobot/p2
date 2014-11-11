var gulp = require('gulp');
var baked = require('baked/gulp');
require('./helpers.js');

gulp.task('serve', ['baked:serve']);
gulp.task('default', ['baked:default']);
gulp.task('clean', ['baked:clean']);

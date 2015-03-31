var gulp = require('gulp');
var baked = require('baked/gulp');
var potato = require('potato.js');
var Resolver = require('./src/resolver');
var config = require('./config.json');
require('./helpers.js');

helpers.potato = potato;
helpers.resolver = new Resolver(config.urlBase);

gulp.task('serve', ['baked:serve']);
gulp.task('default', ['baked:default']);
gulp.task('clean', ['baked:clean']);

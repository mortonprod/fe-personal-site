///DONT NEED TO RENAME FILES SINCE SCRIPT TAGS WILL ALWAYS CALL WITH URL THEY ARE AT PREPENDED TO REQUEST URL. SILLY ME.
const gulp = require('gulp');
const replace = require('gulp-replace');
const debug = require('gulp-debug');
const insert = require('gulp-insert');
const webpack = require('gulp-webpack');
const shell = require('gulp-shell')





gulp.task("default", ["prepend"]);

/**
    Prepend importScript using bash.
*/
gulp.task('prepend', shell.task([
  'bash prepend.sh',
]))

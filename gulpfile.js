///DONT NEED TO RENAME FILES SINCE SCRIPT TAGS WILL ALWAYS CALL WITH URL THEY ARE AT PREPENDED TO REQUEST URL. SILLY ME.
const gulp = require('gulp');
const replace = require('gulp-replace');
const debug = require('gulp-debug');
const insert = require('gulp-insert');
const webpack = require('gulp-webpack');
const shell = require('gulp-shell')





gulp.task("default", ["prepend","partialServiceWorker"]);

/**
    The renames the src and href tag to specify to service worker that is is not in it's scope.
    Must add frontend to url since we will also have backend and need to know the difference.
    NOT NEEDED
*/
gulp.task('documentation', function(){
  gulp.src(['./documentation/**'])
  //  .pipe(debug())
  //  .pipe(replace('src="', 'src="__documentation/frontend/'))
  //  .pipe(replace('href="', 'href="__documentation/frontend/'))
    .pipe(gulp.dest('__documentation/'));
});




let config = {
    output: {
        libraryTarget: 'umd',
        filename: "partialServiceWorker.js"
    }
}





/**
    Create react app uses SWPrecache to create the service worker. 
    We create bundle and place in public. By placing in public create-react-app will add this to list of public urls for server and client rendering.
    -------
    DONE BEFORE BUILD.

*/
gulp.task('partialServiceWorker', function() {
  const outputSW = "./public/"
  return gulp.src('./partialServiceWorker.js')
    .pipe(webpack(config))
    .pipe(gulp.dest(outputSW));
});
/**
    Documentation about insert was not clear so just use a bash script to add require line.
    -----------------
    THIS IS DONE AFTER BUILD
*/
gulp.task('prepend', shell.task([
  'bash prepend.sh',
]))

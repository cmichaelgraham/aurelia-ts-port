var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });

gulp.task('build-ts', function () {
  var tsResult = tsProject.src() // instead of gulp.src(...)
    .pipe(ts(tsProject));

  return tsResult.js.pipe('release');
});

var path = {
  sourceTS: "views/**/*.ts",
  html: "views/**/*.html",
  style: "styles/**/*.css"
}

gulp.task('serve', ['build-ts'], function(done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
  gulp.watch(path.sourceTS, ['build-ts', browserSync.reload]).on('change', reportChange);
  gulp.watch(path.html, [browserSync.reload]).on('change', reportChange);
  gulp.watch(path.style, [browserSync.reload]).on('change', reportChange);
});

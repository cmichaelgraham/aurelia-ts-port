var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var merge = require('merge2');


gulp.task('build-ts', function () {

  var tsProject = ts.createProject('tsconfig.json');

  var tsResult =  gulp.src([
        './aurelia-dts/**/*.d.ts'
        ,'./animator-css/*.ts'
        ,'./app-contacts/*.ts'
        ,'./binding/*.ts'
        ,'./bootstrapper/*.ts'
        ,'./dependency-injection/*.ts'
        ,'./event-aggregator/*.ts'
        ,'./framework/*.ts'
        ,'./history/*.ts'
        ,'./history-browser/*.ts'
        ,'./html-template-element/*.ts'
        ,'./http-client/*.ts'
        ,'./loader/*.ts'
        ,'./loader-default/*.ts'
        ,'./logging/*.ts'
        ,'./metadata/*.ts'
        ,'./path/*.ts'
        ,'./router/*.ts'
        ,'./route-recognizer/*.ts'
        ,'./skeleton-navigation/*.ts'
        ,'./skeleton-plugin/*.ts'
        ,'./task-queue/*.ts'
        ,'./templating/*.ts'
        ,'./templating-binding/*.ts'
        ,'./templating-resources/*.ts'
        ,'./templating-router/*.ts'
        ],
        {base: "."})// tsProject.src() // instead of gulp.src(...)
    .pipe(ts({
         typescript: require('typescript'),
         declarationFiles: false,
         noExternalResolve: true,
         target: "es6",
         module: "system",
         emitDecoratorMetadata: true
    }));

  console.log("hello");

    return tsResult.js.pipe(gulp.dest('../dist/system'));

  // return tsResult.js.pipe('release');
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

var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var merge = require('merge2');

gulp.task('build-ts', [
  'build-ts-system', 
  'build-ts-amd',
  'build-ts-commonjs',
  'build-ts-es6'
  ], function() {});

gulp.task('build-ts-amd', function() {
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
        ,'./validation/**/*.ts'
        ],
        {base: "."})// tsProject.src() // instead of gulp.src(...)
    .pipe(ts({
         //typescript: require('typescript'),
         declarationFiles: false,
         noExternalResolve: true,
         target: "es5",
         module: "amd",
         emitDecoratorMetadata: true
    }));

    return tsResult.js.pipe(gulp.dest('../dist/amd'));
});

gulp.task('build-ts-es6', function() {
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
        ,'./validation/**/*.ts'
        ],
        {base: "."})// tsProject.src() // instead of gulp.src(...)
    .pipe(ts({
         //typescript: require('typescript'),
         declarationFiles: false,
         noExternalResolve: true,
         target: "es6",
         module: "es6",
         emitDecoratorMetadata: true
    }));

    return tsResult.js.pipe(gulp.dest('../dist/es6'));
});

gulp.task('build-ts-commonjs', function() {
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
        ,'./validation/**/*.ts'
        ],
        {base: "."})// tsProject.src() // instead of gulp.src(...)
    .pipe(ts({
         //typescript: require('typescript'),
         declarationFiles: false,
         noExternalResolve: true,
         target: "es5",
         module: "commonjs",
         emitDecoratorMetadata: true
    }));

    return tsResult.js.pipe(gulp.dest('../dist/commonjs'));
});

gulp.task('build-ts-system', function () {
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
        ,'./validation/**/*.ts'
        ],
        {base: "."})// tsProject.src() // instead of gulp.src(...)
    .pipe(ts({
         //typescript: require('typescript'),
         declarationFiles: false,
         noExternalResolve: true,
         target: "es5",
         module: "system",
         emitDecoratorMetadata: true
    }));

    return tsResult.js.pipe(gulp.dest('../dist/system'));
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

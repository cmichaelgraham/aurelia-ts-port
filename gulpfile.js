var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var merge = require('merge2');
var dtsGenerator = require('dts-generator')

var buildTargets = {
  rings: [
    { name: 'ring-0', repos: [
      { name: 'event-aggregator' },
      { name: 'history' },
      { name: 'html-template-element' },
      { name: 'logging' },
      { name: 'logging-console' },
      { name: 'path' },
      { name: 'metadata' },
      { name: 'skeleton-plugin' },
      { name: 'task-queue' },
      { name: 'route-recognizer'}
      ]},
    { name: 'ring-1', repos: [
      { name: 'dependency-injection' },
      { name: 'history-browser' },
      { name: 'loader' },
      { name: 'http-client' }
    ]},
    { name: 'ring-2', repos: [
      { name: 'binding' },
      { name: 'router' },
      { name: 'loader-default' }
    ]},
    { name: 'ring-3', repos: [
      { name: 'templating' }
    ]},
    { name: 'ring-4', repos: [
      { name: 'framework' },
      { name: 'animator-css' },
      { name: 'templating-binding' },
      { name: 'templating-resources' },
      { name: 'templating-router' }
    ]},
    { name: 'ring-5', repos: [
      { name: 'app-contacts' },
      { name: 'bootstrapper' },
      { name: 'skeleton-navigation' }
    ]}
  ]
}

gulp.task('dts-gen', function() {
  debugger;
    dtsGenerator.generate({
        name: 'logging',
        baseDir: '/c/a/aurelia-ts-port/aurelia-ts/logging',
        files: [ 'index.d.ts' ],
          out: 'logging.d.ts'
    });
});

gulp.task('build-ts', function () {
    var tsResult = gulp.src([
        './views/*.ts',
        './typings/**/*.d.ts',
        './*.ts'
        ],
        {base: "."})
    .pipe(ts({
         typescript: require('typescript'),
         declarationFiles: false,
         noExternalResolve: true,
         target: "es5",
         module: "amd",
         emitDecoratorMetadata: true
    }));

    return merge([
        tsResult.dts.pipe(gulp.dest('.')),
        tsResult.js.pipe(gulp.dest('.'))
    ]);
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

var dtsGenerator = require('dts-generator')

  debugger;
    dtsGenerator.generate({
        name: 'aurelia-logging',
        baseDir: '/a/aurelia-ts-port/aurelia-ts/logging',
        files: [ 'index.d.ts' ],
          out: 'logging.d.ts',
          main: 'index.ts'
    });

var dtsGenerator = require('dts-generator')

  debugger;
    dtsGenerator.generate({
        name: 'logging',
        baseDir: '/a/aurelia-ts-port/aurelia-ts/logging',
        files: [ 'index.d.ts' ],
          out: 'logging.d.ts'
    });

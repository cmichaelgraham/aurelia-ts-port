var dtsGenerator = require('dts-generator')

dtsGenerator.generate({
    name: 'aurelia-logging',
    baseDir: '/a/aurelia-ts-port/aurelia-ts/logging',
    files: [ 'index.d.ts' ],
    out: 'logging.d.ts',
    main: 'aurelia-logging/index'
});

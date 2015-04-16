var dtsGenerator = require('dts-generator')

dtsGenerator.generate({
    name: 'aurelia-animator-css',
    baseDir: '/a/aurelia-ts-port/aurelia-ts/animator-css',
    files: [ 'index.ts', 'animator.ts' ],
    out: 'animator-css.d.ts',
    main: 'aurelia-animator-css/index'
});

dtsGenerator.generate({
    name: 'aurelia-logging',
    baseDir: '/a/aurelia-ts-port/aurelia-ts/logging',
    files: [ 'index.ts' ],
    out: 'logging.d.ts',
    main: 'aurelia-logging/index'
});

var dtsGenerator = require('dts-generator')

// animator-css
dtsGenerator.generate({
    name: 'aurelia-animator-css',
    baseDir: '/a/aurelia-ts-port/aurelia-ts/animator-css',
    files: [ 'index.ts', 'animator.ts' ],
    out: 'aurelia-dts/animator-css.d.ts',
    main: 'aurelia-animator-css/index'
});

// app-contacts
dtsGenerator.generate({
    name: 'aurelia-binding',
    baseDir: '/a/aurelia-ts-port/aurelia-ts/binding',
    files: [ 
    	'index.ts', 
    	'array-change-records.ts', 
    	'array-observation.ts', 
    	'ast.ts', 
    	'binding-expression.ts', 
    	'binding-mode.ts', 
    	'call-expression.ts', 
    	'collection-observation.ts',
    	'composite-observer.ts',
    	'computed-observation.ts',
    	'dirty-checking.ts',
    	'element-observation.ts',
    	'event-manager.ts',
    	'lexer.ts',
    	'listener-expression.ts',
    	'map-change-records.ts',
    	'map-observation.ts',
    	'name-expression.ts',
    	'observer-locator.ts',
    	'parser.ts',
    	'path-observer.ts',
    	'property-observation.ts',
    	'value-converter.ts'
    ],
    out: 'aurelia-dts/binding.d.ts',
    main: 'aurelia-binding/index'
});

// logging
dtsGenerator.generate({
    name: 'aurelia-logging',
    baseDir: '/a/aurelia-ts-port/aurelia-ts/logging',
    files: [ 'index.ts' ],
    out: 'aurelia-dts/logging.d.ts',
    main: 'aurelia-logging/index'
});

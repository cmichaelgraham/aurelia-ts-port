var dtsGenerator = require('dts-generator')
var fs = require('fs');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var buildTargets = {
  rings: [
    { name: 'ring-0', repos: [
      { name: 'event-aggregator' },
      { name: 'history' },
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

console.log('---------------------------------------');
console.log('   __dirname: ' + __dirname);
console.log('---------------------------------------');
var ringSources = [];
buildTargets.rings.forEach(function(ring) {
    console.log('  ring: ' + ring.name);

    ring.repos.forEach(function(repo) {
        // console.log('    repo: ' + repo.name);
        repo.files = [];

        fs.readdirSync(__dirname + "/aurelia-ts/" + repo.name).forEach(function(name) {
            if (name.toLowerCase().endsWith('.ts') && ! name.toLowerCase().endsWith('.d.ts')) {
                // console.log('      file: ' + name);
                repo.files.push(name);
            }
        });

        var sources = [];
        sources.push(__dirname + "/aurelia-ts/" + repo.name + "/*.ts");
        sources.push(__dirname + "/aurelia-ts/*.d.ts");
        ringSources.forEach(function(ringSource) {
            sources.push(ringSource);
        });

        // gen dts here
        console.log('    gen dts ' + repo.name);
        dtsGenerator.generate({
            name: 'aurelia-' + repo.name,
            baseDir: __dirname + '/aurelia-ts/' + repo.name,
            files: repo.files,
            out: 'aurelia-dts/' + ring.name + '/aurelia-' + repo.name + '.d.ts',
            main: 'aurelia-' + repo.name + '/index'
        });

        console.log('');
    });

    ringSources.push(__dirname + "/aurelia-dts/" + ring.name + '/*.ts');
});

console.log('---------------------------------------');

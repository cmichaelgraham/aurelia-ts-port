System.register([], function(exports_1) {
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .plugin('aurelia-animator-css');
        aurelia.start().then(function (a) { return a.setRoot(); });
    }
    exports_1("configure", configure);
    return {
        setters:[],
        execute: function() {
        }
    }
});

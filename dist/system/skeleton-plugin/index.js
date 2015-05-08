System.register([], function(exports_1) {
    function configure(aurelia) {
        aurelia.globalizeResources('./hello-world');
    }
    exports_1("configure", configure);
    return {
        setters:[],
        execute: function() {
        }
    }
});

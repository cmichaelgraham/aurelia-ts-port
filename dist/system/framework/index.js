/**
 * The aurelia framework brings together all the required core aurelia libraries into a ready-to-go application-building platform.
 *
 * @module framework
 */
System.register(['./aurelia', 'aurelia-dependency-injection', 'aurelia-binding', 'aurelia-metadata', 'aurelia-templating', 'aurelia-loader', 'aurelia-task-queue', 'aurelia-logging'], function(exports_1) {
    var TheLogManager;
    var LogManager;
    var exportedNames_1 = {
        'LogManager': true,
        'Aurelia': true
    };
    function exportStar_1(m) {
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports_1(n, m[n]);
        }
    }
    return {
        setters:[
            function (_aurelia_1) {
                exports_1("Aurelia", _aurelia_1["Aurelia"]);
            },
            function (_aurelia_dependency_injection_1) {
                exportStar_1(_aurelia_dependency_injection_1);
            },
            function (_aurelia_binding_1) {
                exportStar_1(_aurelia_binding_1);
            },
            function (_aurelia_metadata_1) {
                exportStar_1(_aurelia_metadata_1);
            },
            function (_aurelia_templating_1) {
                exportStar_1(_aurelia_templating_1);
            },
            function (_aurelia_loader_1) {
                exportStar_1(_aurelia_loader_1);
            },
            function (_aurelia_task_queue_1) {
                exportStar_1(_aurelia_task_queue_1);
            },
            function (_TheLogManager) {
                TheLogManager = _TheLogManager;
            }],
        execute: function() {
            exports_1("LogManager", LogManager = TheLogManager);
        }
    }
});

/**
 * The aurelia framework brings together all the required core aurelia libraries into a ready-to-go application-building platform.
 *
 * @module framework
 */
define(["require", "exports", './aurelia', 'aurelia-dependency-injection', 'aurelia-binding', 'aurelia-metadata', 'aurelia-templating', 'aurelia-loader', 'aurelia-task-queue', 'aurelia-logging'], function (require, exports, aurelia_1, aurelia_dependency_injection_1, aurelia_binding_1, aurelia_metadata_1, aurelia_templating_1, aurelia_loader_1, aurelia_task_queue_1, TheLogManager) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.Aurelia = aurelia_1.Aurelia;
    __export(aurelia_dependency_injection_1);
    __export(aurelia_binding_1);
    __export(aurelia_metadata_1);
    __export(aurelia_templating_1);
    __export(aurelia_loader_1);
    __export(aurelia_task_queue_1);
    exports.LogManager = TheLogManager;
});

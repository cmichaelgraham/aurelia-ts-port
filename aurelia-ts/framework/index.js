/**
 * The aurelia framework brings together all the required core aurelia libraries into a ready-to-go application-building platform.
 *
 * @module framework
 */
define(["require", "exports", './aurelia', 'aurelia-dependency-injection', 'aurelia-binding', 'aurelia-metadata', 'aurelia-templating', 'aurelia-loader', 'aurelia-task-queue', '../logging/index'], function (require, exports, _aurelia, _aurelia_dependency_injection, _aurelia_binding, _aurelia_metadata, _aurelia_templating, _aurelia_loader, _aurelia_task_queue, TheLogManager) {
    exports.Aurelia = _aurelia.Aurelia;
    for (var _a in _aurelia_dependency_injection) if (!exports.hasOwnProperty(_a)) exports[_a] = _aurelia_dependency_injection[_a];
    for (var _b in _aurelia_binding) if (!exports.hasOwnProperty(_b)) exports[_b] = _aurelia_binding[_b];
    for (var _c in _aurelia_metadata) if (!exports.hasOwnProperty(_c)) exports[_c] = _aurelia_metadata[_c];
    for (var _d in _aurelia_templating) if (!exports.hasOwnProperty(_d)) exports[_d] = _aurelia_templating[_d];
    for (var _e in _aurelia_loader) if (!exports.hasOwnProperty(_e)) exports[_e] = _aurelia_loader[_e];
    for (var _f in _aurelia_task_queue) if (!exports.hasOwnProperty(_f)) exports[_f] = _aurelia_task_queue[_f];
    exports.LogManager = TheLogManager;
});

/**
 * The aurelia framework brings together all the required core aurelia libraries into a ready-to-go application-building platform.
 *
 * @module framework
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var aurelia_1 = require('./aurelia');
exports.Aurelia = aurelia_1.Aurelia;
__export(require('aurelia-dependency-injection'));
__export(require('aurelia-binding'));
__export(require('aurelia-metadata'));
__export(require('aurelia-templating'));
__export(require('aurelia-loader'));
__export(require('aurelia-task-queue'));
var TheLogManager = require('aurelia-logging');
exports.LogManager = TheLogManager;

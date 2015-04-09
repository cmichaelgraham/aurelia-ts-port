/**
 * Utilities for reading and writing the metadata of JavaScript functions.
 *
 * @module metadata
 */
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", './origin', './resource-type', './metadata', './decorators'], function (require, exports, origin_1, resource_type_1, metadata_1, decorators_1) {
    exports.Origin = origin_1.Origin;
    exports.ResourceType = resource_type_1.ResourceType;
    exports.Metadata = metadata_1.Metadata;
    exports.Decorators = decorators_1.Decorators;
});

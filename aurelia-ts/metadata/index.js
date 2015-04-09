/**
 * Utilities for reading and writing the metadata of JavaScript functions.
 *
 * @module metadata
 */
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", './origin', './resource-type', './metadata', './decorators'], function (require, exports, origin_1, resource_type_1, metadata_1, decorators_1) {
    exports.Origin = origin_1.Origin;
    exports.ResourceType = resource_type_1.ResourceType;
    exports.Metadata = metadata_1.Metadata;
    exports.Decorators = decorators_1.Decorators;
});

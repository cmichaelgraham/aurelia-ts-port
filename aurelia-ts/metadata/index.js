/**
 * Utilities for reading and writing the metadata of JavaScript functions.
 *
 * @module metadata
 */
define(["require", "exports", './origin', './resource-type', './metadata', './decorators'], function (require, exports, origin_1, resource_type_1, metadata_1, decorators_1) {
    exports.Origin = origin_1.Origin;
    exports.ResourceType = resource_type_1.ResourceType;
    exports.Metadata = metadata_1.Metadata;
    exports.Decorators = decorators_1.Decorators;
});

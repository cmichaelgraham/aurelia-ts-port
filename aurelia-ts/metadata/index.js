/**
 * Utilities for reading and writing the metadata of JavaScript functions.
 *
 * @module metadata
 */
define(["require", "exports", './origin', './resource-type', './metadata', './decorators'], function (require, exports, _origin, _resource_type, _metadata, _decorators) {
    exports.Origin = _origin.Origin;
    exports.ResourceType = _resource_type.ResourceType;
    exports.Metadata = _metadata.Metadata;
    exports.Decorators = _decorators.Decorators;
});

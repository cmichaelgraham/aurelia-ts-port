define(["require", "exports"], function (require, exports) {
    function ensureDecorators(target) {
        var applicator;
        if (typeof target.decorators === 'function') {
            applicator = target.decorators();
        }
        else {
            applicator = target.decorators;
        }
        if (typeof applicator._decorate === 'function') {
            delete target.decorators;
            applicator._decorate(target);
        }
        else {
            throw new Error('The return value of your decorator\'s method was not valid.');
        }
    }
    /**
    * Provides helpers for working with metadata.
    *
    * @class Metadata
    * @static
    */
    exports.Metadata = {
        resource: 'aurelia:resource',
        paramTypes: 'design:paramtypes',
        properties: 'design:properties',
        get: function (metadataKey, target, propertyKey) {
            if (!target) {
                return undefined;
            }
            var result = exports.Metadata.getOwn(metadataKey, target, propertyKey);
            return result === undefined ? exports.Metadata.get(metadataKey, Object.getPrototypeOf(target), propertyKey) : result;
        },
        getOwn: function (metadataKey, target, propertyKey) {
            if (!target) {
                return undefined;
            }
            if (target.hasOwnProperty('decorators')) {
                ensureDecorators(target);
            }
            return Reflect.getOwnMetadata(metadataKey, target, propertyKey);
        },
        getOrCreateOwn: function (metadataKey, Type, target, propertyKey) {
            var result = exports.Metadata.getOwn(metadataKey, target, propertyKey);
            if (result === undefined) {
                result = new Type();
                Reflect.defineMetadata(metadataKey, result, target, propertyKey);
            }
            return result;
        }
    };
});

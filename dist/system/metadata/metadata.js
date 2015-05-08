System.register([], function(exports_1) {
    var Metadata;
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
    return {
        setters:[],
        execute: function() {
            /**
            * Provides helpers for working with metadata.
            *
            * @class Metadata
            * @static
            */
            exports_1("Metadata", Metadata = {
                resource: 'aurelia:resource',
                paramTypes: 'design:paramtypes',
                properties: 'design:properties',
                get: function (metadataKey, target, propertyKey) {
                    if (!target) {
                        return undefined;
                    }
                    var result = Metadata.getOwn(metadataKey, target, propertyKey);
                    return result === undefined ? Metadata.get(metadataKey, Object.getPrototypeOf(target), propertyKey) : result;
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
                    var result = Metadata.getOwn(metadataKey, target, propertyKey);
                    if (result === undefined) {
                        result = new Type();
                        Reflect.defineMetadata(metadataKey, result, target, propertyKey);
                    }
                    return result;
                }
            });
        }
    }
});

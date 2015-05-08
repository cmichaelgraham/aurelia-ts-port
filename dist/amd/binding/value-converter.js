define(["require", "exports"], function (require, exports) {
    function camelCase(name) {
        return name.charAt(0).toLowerCase() + name.slice(1);
    }
    var ValueConverterResource = (function () {
        function ValueConverterResource(name) {
            this.name = name;
        }
        ValueConverterResource.convention = function (name) {
            if (name.endsWith('ValueConverter')) {
                return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
            }
        };
        ValueConverterResource.prototype.analyze = function (container, target) {
            this.instance = container.get(target);
        };
        ValueConverterResource.prototype.register = function (registry, name) {
            registry.registerValueConverter(name || this.name, this.instance);
        };
        ValueConverterResource.prototype.load = function (container, target) {
            return Promise.resolve(this);
        };
        return ValueConverterResource;
    })();
    exports.ValueConverterResource = ValueConverterResource;
});

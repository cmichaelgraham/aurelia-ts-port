var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../metadata/index'], function (require, exports, _index) {
    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
    function camelCase(name) {
        return name.charAt(0).toLowerCase() + name.slice(1);
    }
    var ValueConverterResource = (function (_super) {
        __extends(ValueConverterResource, _super);
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
    })(_index.ResourceType);
    exports.ValueConverterResource = ValueConverterResource;
});

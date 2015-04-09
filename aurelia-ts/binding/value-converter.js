var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
define(["require", "exports", '../metadata/index'], function (require, exports, index_1) {
    function camelCase(name) {
        return name.charAt(0).toLowerCase() + name.slice(1);
    }
    var ValueConverterResource = (function (_super) {
        __extends(ValueConverterResource, _super);
        function ValueConverterResource(name) {
            _super.call(this);
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
    })(index_1.ResourceType);
    exports.ValueConverterResource = ValueConverterResource;
});

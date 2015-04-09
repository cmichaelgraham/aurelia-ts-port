var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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

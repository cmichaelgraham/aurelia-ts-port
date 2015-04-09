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
define(["require", "exports", '../metadata/index', '../binding/index'], function (require, exports, index_1, index_2) {
    var ElementConfigResource = (function (_super) {
        __extends(ElementConfigResource, _super);
        function ElementConfigResource() {
            _super.apply(this, arguments);
        }
        ElementConfigResource.prototype.load = function (container, target) {
            var config = new target(), eventManager = container.get(index_2.EventManager);
            eventManager.registerElementConfig(config);
            return Promise.resolve(this);
        };
        ElementConfigResource.prototype.register = function () { };
        return ElementConfigResource;
    })(index_1.ResourceType);
    exports.ElementConfigResource = ElementConfigResource;
});

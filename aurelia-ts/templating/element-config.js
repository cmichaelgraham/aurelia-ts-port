var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'aurelia-binding'], function (require, exports, aurelia_binding_1) {
    var ElementConfigResource = (function (_super) {
        __extends(ElementConfigResource, _super);
        function ElementConfigResource() {
            _super.apply(this, arguments);
        }
        ElementConfigResource.prototype.load = function (container, target) {
            var config = new target(), eventManager = container.get(aurelia_binding_1.EventManager);
            eventManager.registerElementConfig(config);
            return Promise.resolve(this);
        };
        ElementConfigResource.prototype.register = function () { };
        return ElementConfigResource;
    })(ResourceType);
    exports.ElementConfigResource = ElementConfigResource;
});

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

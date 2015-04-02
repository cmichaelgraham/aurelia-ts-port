var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../metadata/index', '../binding/index'], function (require, exports, _index, _index_1) {
    var ElementConfig = (function (_super) {
        __extends(ElementConfig, _super);
        function ElementConfig() {
            _super.apply(this, arguments);
        }
        ElementConfig.prototype.load = function (container, target) {
            var config = new target(), eventManager = container.get(_index_1.EventManager);
            eventManager.registerElementConfig(config);
        };
        ElementConfig.prototype.register = function () {
        };
        return ElementConfig;
    })(_index.ResourceType);
    exports.ElementConfig = ElementConfig;
});

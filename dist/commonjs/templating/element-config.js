var aurelia_binding_1 = require('aurelia-binding');
var ElementConfigResource = (function () {
    function ElementConfigResource() {
    }
    ElementConfigResource.prototype.load = function (container, target) {
        var config = new target(), eventManager = container.get(aurelia_binding_1.EventManager);
        eventManager.registerElementConfig(config);
        return Promise.resolve(this);
    };
    ElementConfigResource.prototype.register = function () { };
    return ElementConfigResource;
})();
exports.ElementConfigResource = ElementConfigResource;

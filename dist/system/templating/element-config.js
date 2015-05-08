System.register(['aurelia-binding'], function(exports_1) {
    var aurelia_binding_1;
    var ElementConfigResource;
    return {
        setters:[
            function (_aurelia_binding_1) {
                aurelia_binding_1 = _aurelia_binding_1;
            }],
        execute: function() {
            ElementConfigResource = (function () {
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
            exports_1("ElementConfigResource", ElementConfigResource);
        }
    }
});

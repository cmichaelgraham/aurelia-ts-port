var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = this.__metadata || (typeof Reflect === "object" && Reflect.metadata) || function () { };
define(["require", "exports", 'aurelia-templating', 'aurelia-dependency-injection', 'aurelia-router'], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1, aurelia_router_1) {
    var RouteHref = (function () {
        function RouteHref(router, element) {
            this.router = router;
            this.element = element;
        }
        RouteHref.prototype.bind = function () {
            this.processChange();
        };
        RouteHref.prototype.attributeChanged = function (value, previous) {
            if (previous) {
                this.element.removeAttribute(previous);
            }
            this.processChange();
        };
        RouteHref.prototype.processChange = function () {
            var href = this.router.generate(this.route, this.params);
            this.element.setAttribute(this.attribute, href);
        };
        RouteHref = __decorate([
            aurelia_templating_1.customAttribute('route-href'),
            aurelia_templating_1.bindable({ name: 'route', changeHandler: 'processChange' }),
            aurelia_templating_1.bindable({ name: 'params', changeHandler: 'processChange' }),
            aurelia_templating_1.bindable({ name: 'attribute', defaultValue: 'href' }),
            aurelia_dependency_injection_1.inject(aurelia_router_1.Router, Element), 
            __metadata('design:paramtypes', [Object, Object])
        ], RouteHref);
        return RouteHref;
    })();
    exports.RouteHref = RouteHref;
});

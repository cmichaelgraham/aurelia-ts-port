var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-templating'], function (require, exports, aurelia_dependency_injection_1, aurelia_templating_1) {
    var Replaceable = (function () {
        function Replaceable(viewFactory, viewSlot) {
            viewSlot.add(viewFactory.create());
        }
        Replaceable = __decorate([
            aurelia_templating_1.customAttribute('replaceable'),
            aurelia_templating_1.templateController,
            aurelia_dependency_injection_1.inject(aurelia_templating_1.BoundViewFactory, aurelia_templating_1.ViewSlot), 
            __metadata('design:paramtypes', [Object, Object])
        ], Replaceable);
        return Replaceable;
    })();
    exports.Replaceable = Replaceable;
});

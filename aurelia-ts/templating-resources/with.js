var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-templating'], function (require, exports, aurelia_dependency_injection_1, aurelia_templating_1) {
    var With = (function () {
        function With(viewFactory, viewSlot) {
            this.viewFactory = viewFactory;
            this.viewSlot = viewSlot;
        }
        With.prototype.valueChanged = function (newValue) {
            if (!this.view) {
                this.view = this.viewFactory.create(newValue);
                this.viewSlot.add(this.view);
            }
            else {
                this.view.bind(newValue);
            }
        };
        With = __decorate([
            aurelia_templating_1.customAttribute('with'),
            aurelia_templating_1.templateController,
            aurelia_dependency_injection_1.inject(aurelia_templating_1.BoundViewFactory, aurelia_templating_1.ViewSlot)
        ], With);
        return With;
    })();
    exports.With = With;
});

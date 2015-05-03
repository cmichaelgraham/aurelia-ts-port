if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-templating', 'aurelia-dependency-injection'], function (require, exports, aurelia_templating_1, aurelia_dependency_injection_1) {
    var If = (function () {
        function If(viewFactory, viewSlot) {
            this.viewFactory = viewFactory;
            this.viewSlot = viewSlot;
            this.showing = false;
        }
        If.prototype.valueChanged = function (newValue) {
            if (!newValue) {
                if (this.view) {
                    this.viewSlot.remove(this.view);
                    this.view.unbind();
                }
                this.showing = false;
                return;
            }
            if (!this.view) {
                this.view = this.viewFactory.create();
            }
            if (!this.showing) {
                this.showing = true;
                if (!this.view.bound) {
                    this.view.bind();
                }
                this.viewSlot.add(this.view);
            }
        };
        If = __decorate([
            aurelia_templating_1.customAttribute('if'),
            aurelia_templating_1.templateController,
            aurelia_dependency_injection_1.inject(aurelia_templating_1.BoundViewFactory, aurelia_templating_1.ViewSlot), 
            __metadata('design:paramtypes', [Object, Object])
        ], If);
        return If;
    })();
    exports.If = If;
});

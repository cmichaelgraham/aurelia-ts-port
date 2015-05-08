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
};System.register(['aurelia-templating', 'aurelia-dependency-injection'], function(exports_1) {
    var aurelia_templating_1, aurelia_dependency_injection_1;
    var If;
    return {
        setters:[
            function (_aurelia_templating_1) {
                aurelia_templating_1 = _aurelia_templating_1;
            },
            function (_aurelia_dependency_injection_1) {
                aurelia_dependency_injection_1 = _aurelia_dependency_injection_1;
            }],
        execute: function() {
            If = (function () {
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
            exports_1("If", If);
        }
    }
});

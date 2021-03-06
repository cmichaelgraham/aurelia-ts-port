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
};System.register(['aurelia-dependency-injection', 'aurelia-templating'], function(exports_1) {
    var aurelia_dependency_injection_1, aurelia_templating_1;
    var With;
    return {
        setters:[
            function (_aurelia_dependency_injection_1) {
                aurelia_dependency_injection_1 = _aurelia_dependency_injection_1;
            },
            function (_aurelia_templating_1) {
                aurelia_templating_1 = _aurelia_templating_1;
            }],
        execute: function() {
            With = (function () {
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
                    aurelia_dependency_injection_1.inject(aurelia_templating_1.BoundViewFactory, aurelia_templating_1.ViewSlot), 
                    __metadata('design:paramtypes', [Object, Object])
                ], With);
                return With;
            })();
            exports_1("With", With);
        }
    }
});

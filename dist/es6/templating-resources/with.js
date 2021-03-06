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
import { inject } from 'aurelia-dependency-injection';
import { BoundViewFactory, ViewSlot, customAttribute, templateController } from 'aurelia-templating';
export let With = class {
    constructor(viewFactory, viewSlot) {
        this.viewFactory = viewFactory;
        this.viewSlot = viewSlot;
    }
    valueChanged(newValue) {
        if (!this.view) {
            this.view = this.viewFactory.create(newValue);
            this.viewSlot.add(this.view);
        }
        else {
            this.view.bind(newValue);
        }
    }
};
With = __decorate([
    customAttribute('with'),
    templateController,
    inject(BoundViewFactory, ViewSlot), 
    __metadata('design:paramtypes', [Object, Object])
], With);

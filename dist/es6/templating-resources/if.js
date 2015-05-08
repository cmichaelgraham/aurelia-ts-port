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
import { BoundViewFactory, ViewSlot, customAttribute, templateController } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
export let If = class {
    constructor(viewFactory, viewSlot) {
        this.viewFactory = viewFactory;
        this.viewSlot = viewSlot;
        this.showing = false;
    }
    valueChanged(newValue) {
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
    }
};
If = __decorate([
    customAttribute('if'),
    templateController,
    inject(BoundViewFactory, ViewSlot), 
    __metadata('design:paramtypes', [Object, Object])
], If);

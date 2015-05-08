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
import { customAttribute, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
export let RouteHref = class {
    constructor(router, element) {
        this.router = router;
        this.element = element;
    }
    bind() {
        this.processChange();
    }
    attributeChanged(value, previous) {
        if (previous) {
            this.element.removeAttribute(previous);
        }
        this.processChange();
    }
    processChange() {
        let href = this.router.generate(this.route, this.params);
        this.element.setAttribute(this.attribute, href);
    }
};
RouteHref = __decorate([
    customAttribute('route-href'),
    bindable({ name: 'route', changeHandler: 'processChange' }),
    bindable({ name: 'params', changeHandler: 'processChange' }),
    bindable({ name: 'attribute', defaultValue: 'href' }),
    inject(Router, Element), 
    __metadata('design:paramtypes', [Object, Object])
], RouteHref);

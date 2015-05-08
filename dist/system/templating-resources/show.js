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
import { customAttribute } from 'aurelia-templating';
function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    node.type = 'text/css';
    document.head.appendChild(node);
}
addStyleString('.aurelia-hide { display:none !important; }');
export let Show = class {
    constructor(element) {
        this.element = element;
    }
    valueChanged(newValue) {
        if (newValue) {
            this.element.classList.remove('aurelia-hide');
        }
        else {
            this.element.classList.add('aurelia-hide');
        }
    }
};
Show = __decorate([
    customAttribute('show'),
    inject(Element), 
    __metadata('design:paramtypes', [Object])
], Show);

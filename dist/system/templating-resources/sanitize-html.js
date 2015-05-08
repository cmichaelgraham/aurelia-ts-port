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
import { valueConverter } from 'aurelia-binding';
var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
export let SanitizeHtmlValueConverter = class {
    constructor() {
        this.sanitizer = SanitizeHtmlValueConverter.defaultSanitizer;
    }
    static defaultSanitizer(untrustedMarkup) {
        return untrustedMarkup.replace(SCRIPT_REGEX, '');
    }
    toView(untrustedMarkup) {
        if (untrustedMarkup === null) {
            return null;
        }
        return this.sanitizer(untrustedMarkup);
    }
};
SanitizeHtmlValueConverter = __decorate([
    valueConverter('sanitizeHtml'), 
    __metadata('design:paramtypes', [])
], SanitizeHtmlValueConverter);

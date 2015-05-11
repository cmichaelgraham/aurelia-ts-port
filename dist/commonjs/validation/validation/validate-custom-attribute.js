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
var aurelia_dependency_injection_1 = require('aurelia-dependency-injection');
var aurelia_templating_1 = require('aurelia-templating');
var ValidateCustomAttribute = (function () {
    function ValidateCustomAttribute(element) {
        this.element = element;
        this.processedValidation = null;
        this.viewStrategy = null;
    }
    ValidateCustomAttribute.prototype.valueChanged = function (newValue) {
        if (this.value === null || this.value === undefined)
            return;
        this.processedValidation = this.value;
        if (typeof (this.value) === 'string') {
            return; //this is just to tell the real validation instance (higher in the DOM) the exact property-path to bind to
        }
        else {
            //binding to a validation instance
            this.subscribeChangedHandlers(this.element);
        }
    };
    ValidateCustomAttribute.prototype.subscribeChangedHandlers = function (currentElement) {
        var _this = this;
        this.viewStrategy = this.value.config.getViewStrategy();
        var validationProperty = this.viewStrategy.getValidationProperty(this.value, currentElement);
        if (validationProperty !== null && validationProperty !== undefined) {
            this.viewStrategy.prepareElement(validationProperty, currentElement);
            validationProperty.onValidate(function (vp) {
                _this.viewStrategy.updateElement(vp, currentElement);
            });
        }
        var children = currentElement.children;
        for (var i = 0; i < children.length; i++) {
            this.subscribeChangedHandlers(children[i]);
        }
    };
    ValidateCustomAttribute.prototype.detached = function () {
    };
    ValidateCustomAttribute.prototype.attached = function () {
        if (this.processedValidation === null || this.processedValidation === undefined)
            this.valueChanged(this.value);
    };
    ValidateCustomAttribute = __decorate([
        aurelia_templating_1.customAttribute('validate'),
        aurelia_dependency_injection_1.inject(Element), 
        __metadata('design:paramtypes', [Object])
    ], ValidateCustomAttribute);
    return ValidateCustomAttribute;
})();
exports.ValidateCustomAttribute = ValidateCustomAttribute;

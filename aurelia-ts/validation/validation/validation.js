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
import { ObserverLocator } from 'aurelia-binding';
import { ValidationGroup } from '../validation/validation-group';
import { inject } from 'aurelia-dependency-injection';
import { ValidationConfig } from '../validation/validation-config';
/**
 * A lightweight validation plugin
 * @class Validation
 * @constructor
 */
export let Validation = class {
    /**
     * Instantiates a new {Validation}
     * @param observerLocator the observerLocator used to observer properties
     * @param validationConfig the configuration
     */
    constructor(observerLocator, validationConfig) {
        this.observerLocator = observerLocator;
        this.config = validationConfig ? validationConfig : Validation.defaults;
    }
    /**
     * Returns a new validation group on the subject
     * @param subject The subject to validate
     * @returns {ValidationGroup} A ValidationGroup that encapsulates the validation rules and current validation state for this subject
     */
    on(subject, configCallback) {
        var conf = new ValidationConfig(this.config);
        if (configCallback !== null && configCallback !== undefined && typeof (configCallback) === 'function') {
            configCallback(conf);
        }
        return new ValidationGroup(subject, this.observerLocator, conf);
    }
    onBreezeEntity(breezeEntity, configCallback) {
        var validation = this.on(breezeEntity, configCallback);
        validation.onBreezeEntity();
        return validation;
    }
};
Validation = __decorate([
    inject(ObserverLocator), 
    __metadata('design:paramtypes', [Object, Object])
], Validation);
Validation.defaults = new ValidationConfig();

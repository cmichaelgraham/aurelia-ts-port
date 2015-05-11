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
var aurelia_binding_1 = require('aurelia-binding');
var validation_group_1 = require('../validation/validation-group');
var aurelia_dependency_injection_1 = require('aurelia-dependency-injection');
var validation_config_1 = require('../validation/validation-config');
/**
 * A lightweight validation plugin
 * @class Validation
 * @constructor
 */
var Validation = (function () {
    /**
     * Instantiates a new {Validation}
     * @param observerLocator the observerLocator used to observer properties
     * @param validationConfig the configuration
     */
    function Validation(observerLocator, validationConfig) {
        this.observerLocator = observerLocator;
        this.config = validationConfig ? validationConfig : Validation.defaults;
    }
    /**
     * Returns a new validation group on the subject
     * @param subject The subject to validate
     * @returns {ValidationGroup} A ValidationGroup that encapsulates the validation rules and current validation state for this subject
     */
    Validation.prototype.on = function (subject, configCallback) {
        var conf = new validation_config_1.ValidationConfig(this.config);
        if (configCallback !== null && configCallback !== undefined && typeof (configCallback) === 'function') {
            configCallback(conf);
        }
        return new validation_group_1.ValidationGroup(subject, this.observerLocator, conf);
    };
    Validation.prototype.onBreezeEntity = function (breezeEntity, configCallback) {
        var validation = this.on(breezeEntity, configCallback);
        validation.onBreezeEntity();
        return validation;
    };
    Validation = __decorate([
        aurelia_dependency_injection_1.inject(aurelia_binding_1.ObserverLocator), 
        __metadata('design:paramtypes', [Object, Object])
    ], Validation);
    return Validation;
})();
exports.Validation = Validation;
Validation.defaults = new validation_config_1.ValidationConfig();

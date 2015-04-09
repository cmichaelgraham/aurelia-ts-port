var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", '../../binding/index', '../validation/validation-group', '../validation/validation-locale-repository'], function (require, exports, index_1, validation_group_1, validation_locale_repository_1) {
    /**
     * A lightweight validation plugin
     * @class Validation
     * @constructor
     */
    var Validation = (function () {
        /**
         * Instantiates a new {Validation}
         * @param observerLocator the observerLocator used to observer properties
         */
        function Validation(observerLocator) {
            this.observerLocator = observerLocator;
        }
        Validation.inject = function () {
            return [index_1.ObserverLocator];
        };
        /**
         * Returns a new validation group on the subject
         * @param subject The subject to validate
         * @returns {ValidationGroup} A ValidationGroup that encapsulates the validation rules and current validation state for this subject
         */
        Validation.prototype.on = function (subject) {
            return new validation_group_1.ValidationGroup(subject, this.observerLocator);
        };
        return Validation;
    })();
    exports.Validation = Validation;
    Validation.Utilities = {
        isEmptyValue: function (val) {
            if (typeof val === 'function') {
                return this.isEmptyValue(val());
            }
            if (val === undefined) {
                return true;
            }
            if (val === null) {
                return true;
            }
            if (val === "") {
                return true;
            }
            if (typeof (val) === 'string') {
                if (String.prototype.trim) {
                    val = val.trim();
                }
                else {
                    val = val.replace(/^\s+|\s+$/g, '');
                }
            }
            if (val.length !== undefined) {
                return 0 === val.length;
            }
            return false;
        }
    };
    Validation.Locale = new validation_locale_repository_1.ValidationLocaleRepository();
});

define(["require", "exports", '../../binding/index', '../validation/validation-group', '../validation/validation-locale-repository'], function (require, exports, _index, _validation_group, _validation_locale_repository) {
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
            return [
                _index.ObserverLocator
            ];
        };
        /**
         * Returns a new validation group on the subject
         * @param subject The subject to validate
         * @returns {ValidationGroup} A ValidationGroup that encapsulates the validation rules and current validation state for this subject
         */
        Validation.prototype.on = function (subject) {
            return new _validation_group.ValidationGroup(subject, this.observerLocator);
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
    Validation.Locale = new _validation_locale_repository.ValidationLocaleRepository();
});

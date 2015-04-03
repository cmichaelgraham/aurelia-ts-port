define(["require", "exports", '../validation/validation-rules-collection', '../validation/path-observer'], function (require, exports, AllCollections, _path_observer) {
    var ValidationProperty = (function () {
        function ValidationProperty(observerLocator, propertyName, validationGroup, propertyResult) {
            var _this = this;
            this.propertyResult = propertyResult;
            this.propertyName = propertyName;
            this.validationGroup = validationGroup;
            this.validationRules = new AllCollections.ValidationRulesCollection();
            this.observer = new _path_observer.PathObserver(observerLocator, validationGroup.subject, propertyName).getObserver();
            this.observer.subscribe(function (newValue, oldValue) {
                _this.validate(newValue, true);
            });
        }
        ValidationProperty.prototype.addValidationRule = function (validationRule) {
            if (validationRule.validate === undefined)
                throw new exception("That's not a valid validationRule");
            this.validationRules.addValidationRule(validationRule);
            this.validateCurrentValue(false);
        };
        ValidationProperty.prototype.validateCurrentValue = function (forceDirty) {
            this.validate(this.observer.getValue(), forceDirty);
        };
        ValidationProperty.prototype.validate = function (newValue, shouldBeDirty) {
            var validationResponse = this.validationRules.validate(newValue);
            this.propertyResult.setValidity(validationResponse, shouldBeDirty);
        };
        return ValidationProperty;
    })();
    exports.ValidationProperty = ValidationProperty;
});

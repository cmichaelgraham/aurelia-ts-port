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
define(["require", "exports", '../validation/validation-rules-collection', '../validation/path-observer'], function (require, exports, AllCollections, path_observer_1) {
    var ValidationProperty = (function () {
        function ValidationProperty(observerLocator, propertyName, validationGroup, propertyResult) {
            var _this = this;
            this.propertyResult = propertyResult;
            this.propertyName = propertyName;
            this.validationGroup = validationGroup;
            this.validationRules = new AllCollections.ValidationRulesCollection();
            this.observer = new path_observer_1.PathObserver(observerLocator, validationGroup.subject, propertyName)
                .getObserver();
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

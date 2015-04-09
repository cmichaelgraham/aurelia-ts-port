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
define(["require", "exports", '../validation/validation-rules', '../validation/validation-rules-collection', '../validation/validation-property'], function (require, exports, AllRules, AllCollections, validation_property_1) {
    var ValidationGroupBuilder = (function () {
        function ValidationGroupBuilder(observerLocator, validationGroup) {
            this.observerLocator = observerLocator;
            this.validationRuleCollections = []; //Flattened out queue of the nested collections
            this.validationGroup = validationGroup;
        }
        ValidationGroupBuilder.prototype.ensure = function (propertyName) {
            var newValidationProperty = null;
            this.validationRuleCollections = [];
            for (var i = 0; i < this.validationGroup.validationProperties.length; i++) {
                if (this.validationGroup.validationProperties[i].propertyName === propertyName) {
                    newValidationProperty = this.validationGroup.validationProperties[i];
                    break;
                }
            }
            if (newValidationProperty === null) {
                var propertyResult = this.validationGroup.result.addProperty(propertyName);
                newValidationProperty = new validation_property_1.ValidationProperty(this.observerLocator, propertyName, this.validationGroup, propertyResult);
                this.validationGroup.validationProperties.push(newValidationProperty);
            }
            this.validationRuleCollections.unshift(newValidationProperty.validationRules);
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.notEmpty = function () {
            this.validationRuleCollections[0].notEmpty();
            this.validationGroup.validationProperties[this.validationGroup.validationProperties.length - 1].validateCurrentValue();
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.minimum = function (minimumValue) {
            return this.passesRule(new AllRules.MinimumValueValidationRule(minimumValue));
        };
        ValidationGroupBuilder.prototype.between = function (minimumValue, maximumValue) {
            return this.passesRule(new AllRules.BetweenValueValidationRule(minimumValue, maximumValue));
        };
        ValidationGroupBuilder.prototype.in = function (collection) {
            return this.passesRule(new AllRules.InCollectionValidationRule(collection));
        };
        ValidationGroupBuilder.prototype.maximum = function (maximumValue) {
            return this.passesRule(new AllRules.MaximumValueValidationRule(maximumValue));
        };
        ValidationGroupBuilder.prototype.equals = function (otherValue, otherValueLabel) {
            return this.passesRule(new AllRules.EqualityValidationRule(otherValue, true, otherValueLabel));
        };
        ValidationGroupBuilder.prototype.notEquals = function (otherValue, otherValueLabel) {
            return this.passesRule(new AllRules.EqualityValidationRule(otherValue, false, otherValueLabel));
        };
        ValidationGroupBuilder.prototype.email = function () {
            return this.passesRule(new AllRules.EmailValidationRule());
        };
        ValidationGroupBuilder.prototype.minLength = function (minimumValue) {
            return this.passesRule(new AllRules.MinimumLengthValidationRule(minimumValue));
        };
        ValidationGroupBuilder.prototype.maxLength = function (maximumValue) {
            return this.passesRule(new AllRules.MaximumLengthValidationRule(maximumValue));
        };
        ValidationGroupBuilder.prototype.betweenLength = function (minimumValue, maximumValue) {
            return this.passesRule(new AllRules.BetweenLengthValidationRule(minimumValue, maximumValue));
        };
        ValidationGroupBuilder.prototype.isNumeric = function () {
            return this.passesRule(new AllRules.NumericValidationRule());
        };
        ValidationGroupBuilder.prototype.isDigit = function () {
            return this.passesRule(new AllRules.DigitValidationRule());
        };
        ValidationGroupBuilder.prototype.isAlphanumeric = function () {
            return this.passesRule(new AllRules.AlphaNumericValidationRule());
        };
        ValidationGroupBuilder.prototype.isAlphanumericOrWhitespace = function () {
            return this.passesRule(new AllRules.AlphaNumericOrWhitespaceValidationRule());
        };
        ValidationGroupBuilder.prototype.isStrongPassword = function (minimumComplexityLevel) {
            return this.passesRule(new AllRules.StrongPasswordValidationRule(minimumComplexityLevel));
        };
        ValidationGroupBuilder.prototype.matchesRegex = function (regexString) {
            return this.matches(new RegExp(regexString));
        };
        ValidationGroupBuilder.prototype.matches = function (regex) {
            return this.passesRule(new AllRules.RegexValidationRule(regex));
        };
        ValidationGroupBuilder.prototype.passes = function (customFunction, threshold) {
            return this.passesRule(new AllRules.CustomFunctionValidationRule(customFunction, threshold));
        };
        ValidationGroupBuilder.prototype.passesRule = function (validationRule) {
            this.validationRuleCollections[0].addValidationRule(validationRule);
            this.checkLast();
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.checkLast = function () {
            var validationProperty = this.validationGroup.validationProperties[this.validationGroup.validationProperties.length - 1];
            validationProperty.validateCurrentValue(false);
        };
        ValidationGroupBuilder.prototype.withMessage = function (message) {
            this.validationRuleCollections[0].withMessage(message);
            this.checkLast();
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.if = function (conditionExpression) {
            //IF is treated as a 'switch' with case 'true' and 'default'
            var conditionalCollection = new AllCollections.SwitchCaseValidationRulesCollection(conditionExpression);
            conditionalCollection.case(true);
            this.validationRuleCollections[0].addValidationRuleCollection(conditionalCollection);
            this.validationRuleCollections.unshift(conditionalCollection);
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.else = function () {
            if (!this.validationRuleCollections[0].default)
                throw 'Invalid statement: \'else\'';
            //this.validationRuleCollections[0].case(false);
            this.validationRuleCollections[0].default(); //slightly less object creation then 'case false'
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.endIf = function () {
            if (!this.validationRuleCollections[0].default)
                throw 'Invalid statement: \'endIf\'';
            this.validationRuleCollections.shift(); //go up one level in the nested collections
            this.checkLast();
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.switch = function (conditionExpression) {
            var condition = conditionExpression;
            if (condition === undefined) {
                var observer = this.validationGroup.validationProperties[this.validationGroup.validationProperties.length - 1].observer;
                condition = function () {
                    return observer.getValue();
                };
            }
            var conditionalCollection = new AllCollections.SwitchCaseValidationRulesCollection(condition);
            this.validationRuleCollections[0].addValidationRuleCollection(conditionalCollection);
            this.validationRuleCollections.unshift(conditionalCollection);
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.case = function (caseLabel) {
            if (!this.validationRuleCollections[0].default)
                throw 'Invalid statement: \'case\'';
            this.validationRuleCollections[0].case(caseLabel);
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.default = function () {
            if (!this.validationRuleCollections[0].default)
                throw 'Invalid statement: \'case\'';
            this.validationRuleCollections[0].default();
            return this.validationGroup;
        };
        ValidationGroupBuilder.prototype.endSwitch = function () {
            if (!this.validationRuleCollections[0].default)
                throw 'Invalid statement: \'endIf\'';
            this.validationRuleCollections.shift(); //go up one level in the nested collections
            this.checkLast();
            return this.validationGroup;
        };
        return ValidationGroupBuilder;
    })();
    exports.ValidationGroupBuilder = ValidationGroupBuilder;
});

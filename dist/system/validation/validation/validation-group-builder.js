System.register(['../validation/validation-rules', '../validation/validation-rules-collection', '../validation/validation-property', '../validation/validation-config'], function(exports_1) {
    var AllRules, AllCollections, validation_property_1, validation_config_1;
    var ValidationGroupBuilder;
    return {
        setters:[
            function (_AllRules) {
                AllRules = _AllRules;
            },
            function (_AllCollections) {
                AllCollections = _AllCollections;
            },
            function (_validation_property_1) {
                validation_property_1 = _validation_property_1;
            },
            function (_validation_config_1) {
                validation_config_1 = _validation_config_1;
            }],
        execute: function() {
            ValidationGroupBuilder = (function () {
                function ValidationGroupBuilder(observerLocator, validationGroup) {
                    this.observerLocator = observerLocator;
                    this.validationRuleCollections = []; //Flattened out queue of the nested collections
                    this.validationGroup = validationGroup;
                }
                ValidationGroupBuilder.prototype.ensure = function (propertyName, configurationCallback) {
                    var newValidationProperty = null;
                    this.validationRuleCollections = [];
                    for (var i = 0; i < this.validationGroup.validationProperties.length; i++) {
                        if (this.validationGroup.validationProperties[i].propertyName === propertyName) {
                            newValidationProperty = this.validationGroup.validationProperties[i];
                            if (configurationCallback !== undefined && typeof (configurationCallback) === 'function') {
                                throw Error('When creating validation rules on binding path ' + propertyName + ' a configuration callback function was provided, but validation rules have previously already been instantiated for this binding path');
                            }
                            break;
                        }
                    }
                    if (newValidationProperty === null) {
                        var propertyResult = this.validationGroup.result.addProperty(propertyName);
                        var config = new validation_config_1.ValidationConfig(this.validationGroup.config);
                        if (configurationCallback !== undefined && typeof (configurationCallback) === 'function') {
                            configurationCallback(config);
                        }
                        newValidationProperty = new validation_property_1.ValidationProperty(this.observerLocator, propertyName, this.validationGroup, propertyResult, config);
                        this.validationGroup.validationProperties.push(newValidationProperty);
                    }
                    this.validationRuleCollections.unshift(newValidationProperty.collectionOfValidationRules);
                    return this.validationGroup;
                };
                ValidationGroupBuilder.prototype.isNotEmpty = function () {
                    this.validationRuleCollections[0].isNotEmpty();
                    this.checkLast();
                    return this.validationGroup;
                };
                ValidationGroupBuilder.prototype.isGreaterThan = function (minimumValue) {
                    return this.passesRule(new AllRules.MinimumValueValidationRule(minimumValue));
                };
                ValidationGroupBuilder.prototype.isGreaterThanOrEqualTo = function (minimumValue) {
                    return this.passesRule(new AllRules.MinimumInclusiveValueValidationRule(minimumValue));
                };
                ValidationGroupBuilder.prototype.isBetween = function (minimumValue, maximumValue) {
                    return this.passesRule(new AllRules.BetweenValueValidationRule(minimumValue, maximumValue));
                };
                ValidationGroupBuilder.prototype.isIn = function (collection) {
                    return this.passesRule(new AllRules.InCollectionValidationRule(collection));
                };
                ValidationGroupBuilder.prototype.isLessThan = function (maximumValue) {
                    return this.passesRule(new AllRules.MaximumValueValidationRule(maximumValue));
                };
                ValidationGroupBuilder.prototype.isLessThanOrEqualTo = function (maximumValue) {
                    return this.passesRule(new AllRules.MaximumInclusiveValueValidationRule(maximumValue));
                };
                ValidationGroupBuilder.prototype.isEqualTo = function (otherValue, otherValueLabel) {
                    if (!otherValueLabel)
                        return this.passesRule(new AllRules.EqualityValidationRule(otherValue));
                    else
                        return this.passesRule(new AllRules.EqualityWithOtherLabelValidationRule(otherValue, otherValueLabel));
                };
                ValidationGroupBuilder.prototype.isNotEqualTo = function (otherValue, otherValueLabel) {
                    if (!otherValueLabel)
                        return this.passesRule(new AllRules.InEqualityValidationRule(otherValue));
                    else
                        return this.passesRule(new AllRules.InEqualityWithOtherLabelValidationRule(otherValue, otherValueLabel));
                };
                ValidationGroupBuilder.prototype.isEmail = function () {
                    return this.passesRule(new AllRules.EmailValidationRule());
                };
                ValidationGroupBuilder.prototype.hasMinLength = function (minimumValue) {
                    return this.passesRule(new AllRules.MinimumLengthValidationRule(minimumValue));
                };
                ValidationGroupBuilder.prototype.hasMaxLength = function (maximumValue) {
                    return this.passesRule(new AllRules.MaximumLengthValidationRule(maximumValue));
                };
                ValidationGroupBuilder.prototype.hasLengthBetween = function (minimumValue, maximumValue) {
                    return this.passesRule(new AllRules.BetweenLengthValidationRule(minimumValue, maximumValue));
                };
                ValidationGroupBuilder.prototype.isNumber = function () {
                    return this.passesRule(new AllRules.NumericValidationRule());
                };
                ValidationGroupBuilder.prototype.containsOnlyDigits = function () {
                    return this.passesRule(new AllRules.DigitValidationRule());
                };
                ValidationGroupBuilder.prototype.containsOnlyAlpha = function () {
                    return this.passesRule(new AllRules.AlphaValidationRule());
                };
                ValidationGroupBuilder.prototype.containsOnlyAlphaOrWhitespace = function () {
                    return this.passesRule(new AllRules.AlphaOrWhitespaceValidationRule());
                };
                ValidationGroupBuilder.prototype.containsOnlyAlphanumerics = function () {
                    return this.passesRule(new AllRules.AlphaNumericValidationRule());
                };
                ValidationGroupBuilder.prototype.containsOnlyAlphanumericsOrWhitespace = function () {
                    return this.passesRule(new AllRules.AlphaNumericOrWhitespaceValidationRule());
                };
                ValidationGroupBuilder.prototype.isStrongPassword = function (minimumComplexityLevel) {
                    if (minimumComplexityLevel === 4)
                        return this.passesRule(new AllRules.StrongPasswordValidationRule());
                    else
                        return this.passesRule(new AllRules.MediumPasswordValidationRule(minimumComplexityLevel));
                };
                ValidationGroupBuilder.prototype.containsOnly = function (regex) {
                    return this.passesRule(new AllRules.ContainsOnlyValidationRule(regex));
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
            exports_1("ValidationGroupBuilder", ValidationGroupBuilder);
        }
    }
});

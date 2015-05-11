var utilities_1 = require('../validation/utilities');
var validation_locale_1 = require('../validation/validation-locale');
var ValidationRulesCollection = (function () {
    function ValidationRulesCollection() {
        this.isRequired = false;
        this.validationRules = [];
        this.validationCollections = [];
        this.isRequiredMessage = null;
    }
    /**
     * Returns a promise that fulfils and resolves to simple result status object.
     */
    ValidationRulesCollection.prototype.validate = function (newValue, locale) {
        if (locale === undefined) {
            locale = validation_locale_1.ValidationLocale.Repository.default;
        }
        newValue = utilities_1.Utilities.getValue(newValue);
        var executeRules = true;
        //Is required?
        if (utilities_1.Utilities.isEmptyValue(newValue)) {
            if (this.isRequired) {
                return Promise.resolve({
                    isValid: false,
                    message: this.isRequiredMessage ?
                        ((typeof (this.isRequiredMessage) === 'function') ? this.isRequiredMessage(newValue) : this.isRequiredMessage) :
                        locale.translate('isRequired'),
                    failingRule: 'isRequired',
                    latestValue: newValue
                });
            }
            else {
                executeRules = false;
            }
        }
        var checks = Promise.resolve({
            isValid: true,
            message: '',
            failingRule: null,
            latestValue: newValue
        });
        //validate rules
        if (executeRules) {
            for (var i = 0; i < this.validationRules.length; i++) {
                var rule = this.validationRules[i];
                checks = checks.then(function (previousRuleResult) {
                    //Earlier in the chain, something resolved to an invalid result. Chain it.
                    if (previousRuleResult.isValid === false) {
                        return previousRuleResult;
                    }
                    else {
                        return rule.validate(newValue, locale).then(function (thisRuleResult) {
                            if (thisRuleResult === false) {
                                return {
                                    isValid: false,
                                    message: rule.explain(),
                                    failingRule: rule.ruleName,
                                    latestValue: newValue
                                };
                            }
                            else {
                                //assertion
                                if (!previousRuleResult.isValid) {
                                    throw Error("ValidationRulesCollection.validate caught an unexpected result while validating it's chain of rules.");
                                }
                                return previousRuleResult;
                            }
                        });
                    }
                });
            }
        }
        //validate collections
        for (var i = 0; i < this.validationCollections.length; i++) {
            var validationCollection = this.validationCollections[i];
            checks = checks.then(function (previousValidationResult) {
                if (previousValidationResult.isValid)
                    return validationCollection.validate(newValue, locale);
                else
                    return previousValidationResult;
            });
        }
        return checks;
    };
    ValidationRulesCollection.prototype.addValidationRule = function (validationRule) {
        if (validationRule.validate === undefined)
            throw new Error("That's not a valid validationRule");
        this.validationRules.push(validationRule);
    };
    ValidationRulesCollection.prototype.addValidationRuleCollection = function (validationRulesCollection) {
        this.validationCollections.push(validationRulesCollection);
    };
    ValidationRulesCollection.prototype.isNotEmpty = function () {
        this.isRequired = true;
    };
    ValidationRulesCollection.prototype.withMessage = function (message) {
        if (this.validationRules.length === 0)
            this.isRequiredMessage = message;
        else
            this.validationRules[this.validationRules.length - 1].withMessage(message);
    };
    return ValidationRulesCollection;
})();
exports.ValidationRulesCollection = ValidationRulesCollection;
var SwitchCaseValidationRulesCollection = (function () {
    function SwitchCaseValidationRulesCollection(conditionExpression) {
        this.conditionExpression = conditionExpression;
        this.innerCollections = [];
        this.defaultCollection = new ValidationRulesCollection();
        this.caseLabel = '';
        this.defaultCaseLabel = { description: 'this is the case label for \'default\'' };
    }
    SwitchCaseValidationRulesCollection.prototype.case = function (caseLabel) {
        this.caseLabel = caseLabel;
        this.getCurrentCollection(caseLabel, true); //force creation
    };
    SwitchCaseValidationRulesCollection.prototype.default = function () {
        this.caseLabel = this.defaultCaseLabel;
    };
    SwitchCaseValidationRulesCollection.prototype.getCurrentCollection = function (caseLabel, createIfNotExists) {
        if (createIfNotExists === void 0) { createIfNotExists = false; }
        if (caseLabel === this.defaultCaseLabel)
            return this.defaultCollection;
        var currentCollection = null;
        for (var i = 0; i < this.innerCollections.length; i++) {
            currentCollection = this.innerCollections[i];
            if (currentCollection.caseLabel === caseLabel)
                return currentCollection.collection;
        }
        if (createIfNotExists) {
            currentCollection = {
                caseLabel: caseLabel,
                collection: new ValidationRulesCollection()
            };
            this.innerCollections.push(currentCollection);
            return currentCollection.collection;
        }
        return null;
    };
    SwitchCaseValidationRulesCollection.prototype.validate = function (newValue, locale) {
        var collection = this.getCurrentCollection(this.conditionExpression(newValue));
        if (collection !== null)
            return collection.validate(newValue, locale);
        else
            return this.defaultCollection.validate(newValue, locale);
    };
    SwitchCaseValidationRulesCollection.prototype.addValidationRule = function (validationRule) {
        var currentCollection = this.getCurrentCollection(this.caseLabel, true);
        currentCollection.addValidationRule(validationRule);
    };
    SwitchCaseValidationRulesCollection.prototype.addValidationRuleCollection = function (validationRulesCollection) {
        var currentCollection = this.getCurrentCollection(this.caseLabel, true);
        currentCollection.addValidationRuleCollection(validationRulesCollection);
    };
    SwitchCaseValidationRulesCollection.prototype.isNotEmpty = function () {
        var collection = this.getCurrentCollection(this.caseLabel);
        if (collection !== null)
            collection.isNotEmpty();
        else
            this.defaultCollection.isNotEmpty();
    };
    SwitchCaseValidationRulesCollection.prototype.withMessage = function (message) {
        var collection = this.getCurrentCollection(this.caseLabel);
        if (collection !== null)
            collection.withMessage(message);
        else
            this.defaultCollection.withMessage(message);
    };
    return SwitchCaseValidationRulesCollection;
})();
exports.SwitchCaseValidationRulesCollection = SwitchCaseValidationRulesCollection;

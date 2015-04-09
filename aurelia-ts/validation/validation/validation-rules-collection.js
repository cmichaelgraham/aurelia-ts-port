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
define(["require", "exports", '../validation/validation'], function (require, exports, validation_1) {
    var ValidationRulesCollection = (function () {
        function ValidationRulesCollection() {
            this.isRequired = false;
            this.validationRules = [];
            this.validationCollections = [];
        }
        ValidationRulesCollection.prototype.validate = function (newValue) {
            var response = {
                isValid: true,
                message: null,
                failingRule: null
            };
            if (validation_1.Validation.Utilities.isEmptyValue(newValue)) {
                if (this.isRequired) {
                    response.isValid = false;
                    response.message = validation_1.Validation.Locale.translate('isRequired');
                    response.failingRule = 'isRequired';
                }
            }
            else {
                //validate rules
                for (var i = 0; i < this.validationRules.length; i++) {
                    var rule = this.validationRules[i];
                    if (!rule.validate(newValue)) {
                        response.isValid = false;
                        response.message = rule.explain();
                        response.failingRule = rule.ruleName;
                        break;
                    }
                }
            }
            if (response.isValid) {
                for (var i = 0; i < this.validationCollections.length; i++) {
                    var validationCollectionResponse = this.validationCollections[i].validate(newValue);
                    if (!validationCollectionResponse.isValid) {
                        response.isValid = false;
                        response.message = validationCollectionResponse.message;
                        response.failingRule = validationCollectionResponse.failingRule;
                        break;
                    }
                }
            }
            return response;
        };
        ValidationRulesCollection.prototype.addValidationRule = function (validationRule) {
            if (validationRule.validate === undefined)
                throw new exception("That's not a valid validationRule");
            this.validationRules.push(validationRule);
        };
        ValidationRulesCollection.prototype.addValidationRuleCollection = function (validationRulesCollection) {
            this.validationCollections.push(validationRulesCollection);
        };
        ValidationRulesCollection.prototype.notEmpty = function () {
            this.isRequired = true;
        };
        ValidationRulesCollection.prototype.withMessage = function (message) {
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
        SwitchCaseValidationRulesCollection.prototype.validate = function (newValue) {
            var collection = this.getCurrentCollection(this.conditionExpression(newValue));
            if (collection !== null)
                return collection.validate(newValue);
            else
                return this.defaultCollection.validate(newValue);
        };
        SwitchCaseValidationRulesCollection.prototype.addValidationRule = function (validationRule) {
            var currentCollection = this.getCurrentCollection(this.caseLabel, true);
            currentCollection.addValidationRule(validationRule);
        };
        SwitchCaseValidationRulesCollection.prototype.addValidationRuleCollection = function (validationRulesCollection) {
            var currentCollection = this.getCurrentCollection(this.caseLabel, true);
            currentCollection.addValidationRuleCollection(validationRulesCollection);
        };
        SwitchCaseValidationRulesCollection.prototype.notEmpty = function () {
            var collection = this.getCurrentCollection(this.caseLabel);
            if (collection !== null)
                collection.notEmpty();
            else
                this.defaultCollection.notEmpty();
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
});

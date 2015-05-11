define(["require", "exports", '../validation/validation-group-builder', '../validation/validation-result'], function (require, exports, validation_group_builder_1, validation_result_1) {
    /**
     * Encapsulates validation rules and their current validation state for a given subject
     * @class ValidationGroup
     * @constructor
     */
    var ValidationGroup = (function () {
        /**
         * Instantiates a new {ValidationGroup}
         * @param subject The subject to evaluate
         * @param observerLocator The observerLocator used to monitor changes on the subject
         * @param config The configuration
         */
        function ValidationGroup(subject, observerLocator, config) {
            var _this = this;
            this.result = new validation_result_1.ValidationResult();
            this.subject = subject;
            this.validationProperties = [];
            this.config = config;
            this.builder = new validation_group_builder_1.ValidationGroupBuilder(observerLocator, this);
            this.onValidateCallbacks = [];
            this.onPropertyValidationCallbacks = [];
            this.isValidating = false;
            this.onDestroy = config.onLocaleChanged(function () {
                _this.validate(false, true);
            });
            if (this.subject.__proto__._validationMetadata) {
                this.subject.__proto__._validationMetadata.setup(this);
            }
        }
        ValidationGroup.prototype.destroy = function () {
            this.onDestroy(); //todo: what else needs to be done for proper cleanup?
        };
        ValidationGroup.prototype.clear = function () {
            this.validationProperties.forEach(function (prop) { prop.clear(); });
            this.result.clear();
        };
        ValidationGroup.prototype.onBreezeEntity = function () {
            var _this = this;
            var breezeEntity = this.subject;
            var me = this;
            this.onPropertyValidate(function (propertyBindingPath) {
                _this.passes(function () {
                    breezeEntity.entityAspect.validateProperty(propertyBindingPath);
                    var errors = breezeEntity.entityAspect.getValidationErrors(propertyBindingPath);
                    if (errors.length === 0)
                        return true;
                    else
                        return errors[0].errorMessage;
                });
            });
            this.onValidate(function () {
                breezeEntity.entityAspect.validateEntity();
                return {};
            });
            breezeEntity.entityAspect.validationErrorsChanged.subscribe(function () {
                breezeEntity.entityAspect.getValidationErrors().forEach(function (validationError) {
                    var propertyName = validationError.propertyName;
                    if (!me.result.properties[propertyName]) {
                        me.ensure(propertyName);
                    }
                    var currentResultProp = me.result.addProperty(propertyName);
                    if (currentResultProp.isValid) {
                        currentResultProp.setValidity({
                            isValid: false,
                            message: validationError.errorMessage,
                            failingRule: 'breeze',
                            latestValue: currentResultProp.latestValue
                        }, true);
                    }
                });
            });
        };
        /**
         * Causes complete re-evaluation: gets the latest value, marks the property as 'dirty' (unless false is passed), runs validation rules asynchronously and updates this.result
         * @returns {Promise} A promise that fulfils when valid, rejects when invalid.
         */
        ValidationGroup.prototype.validate = function (forceDirty, forceExecution) {
            var _this = this;
            if (forceDirty === void 0) { forceDirty = true; }
            if (forceExecution === void 0) { forceExecution = true; }
            this.isValidating = true;
            var promise = Promise.resolve(true);
            for (var i = this.validationProperties.length - 1; i >= 0; i--) {
                var validatorProperty = this.validationProperties[i];
                promise = promise.then(function () { return validatorProperty.validateCurrentValue(forceDirty, forceExecution); });
            }
            promise = promise.catch(function () {
                console.log("Should never get here: a validation property should always resolve to true/false!");
                debugger;
                throw Error("Should never get here: a validation property should always resolve to true/false!");
                return true;
            });
            this.onValidateCallbacks.forEach(function (onValidateCallback) {
                promise = promise.then(function () { return _this.config.locale(); }).then(function (locale) {
                    return Promise.resolve(onValidateCallback.validationFunction()).then(function (callbackResult) {
                        for (var prop in callbackResult) {
                            if (!_this.result.properties[prop]) {
                                _this.ensure(prop);
                            }
                            var resultProp = _this.result.addProperty(prop);
                            var result = callbackResult[prop];
                            var newPropResult = {
                                latestValue: resultProp.latestValue
                            };
                            if (result === true || result === null || result === '') {
                                if (!resultProp.isValid && resultProp.failingRule === 'onValidateCallback') {
                                    newPropResult.failingRule = null;
                                    newPropResult.message = '';
                                    newPropResult.isValid = true;
                                    resultProp.setValidity(newPropResult, true);
                                }
                            }
                            else {
                                if (resultProp.isValid) {
                                    newPropResult.failingRule = 'onValidateCallback';
                                    newPropResult.isValid = false;
                                    if (typeof (result) === 'string') {
                                        newPropResult.message = result;
                                    }
                                    else {
                                        newPropResult.message = locale.translate(newPropResult.failingRule);
                                    }
                                    resultProp.setValidity(newPropResult, true);
                                }
                            }
                        }
                        _this.result.checkValidity();
                    }, function () {
                        var rest = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            rest[_i - 0] = arguments[_i];
                        }
                        debugger;
                        _this.result.isValid = false;
                        if (onValidateCallback.validationFunctionFailedCallback) {
                            onValidateCallback.validationFunctionFailedCallback(rest);
                        }
                    });
                });
            });
            promise = promise
                .then(function () {
                _this.isValidating = false;
                if (_this.result.isValid) {
                    return Promise.resolve(_this.result);
                }
                else {
                    return Promise.reject(_this.result);
                }
            });
            return promise;
        };
        ;
        ValidationGroup.prototype.onValidate = function (validationFunction, validationFunctionFailedCallback) {
            this.onValidateCallbacks.push({ validationFunction: validationFunction, validationFunctionFailedCallback: validationFunctionFailedCallback });
            return this;
        };
        ValidationGroup.prototype.onPropertyValidate = function (validationFunction) {
            this.onPropertyValidationCallbacks.push(validationFunction);
            return this;
        };
        /**
         * Adds a validation property for the specified path
         * @param {String} bindingPath the path of the property/field, for example 'firstName' or 'address.muncipality.zipCode'
         * @param configCallback a configuration callback
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.ensure = function (bindingPath, configCallback) {
            this.builder.ensure(bindingPath, configCallback);
            this.onPropertyValidationCallbacks.forEach(function (callback) { callback(bindingPath); });
            return this;
        };
        /**
         * Adds a validation rule that checks a value for being 'isNotEmpty', 'required'
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isNotEmpty = function () {
            return this.builder.isNotEmpty();
        };
        /**
         * Adds a validation rule that checks a value for being greater than or equal to a threshold
         * @param minimumValue the threshold
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isGreaterThanOrEqualTo = function (minimumValue) {
            return this.builder.isGreaterThanOrEqualTo(minimumValue);
        };
        /**
         * Adds a validation rule that checks a value for being greater than a threshold
         * @param minimumValue the threshold
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isGreaterThan = function (minimumValue) {
            return this.builder.isGreaterThan(minimumValue);
        };
        /**
         * Adds a validation rule that checks a value for being greater than or equal to a threshold, and less than or equal to another threshold
         * @param minimumValue The minimum threshold
         * @param maximumValue The isLessThanOrEqualTo threshold
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isBetween = function (minimumValue, maximumValue) {
            return this.builder.isBetween(minimumValue, maximumValue);
        };
        /**
         * Adds a validation rule that checks a value for being less than a threshold
         * @param maximumValue The threshold
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isLessThanOrEqualTo = function (maximumValue) {
            return this.builder.isLessThanOrEqualTo(maximumValue);
        };
        /**
         * Adds a validation rule that checks a value for being less than or equal to a threshold
         * @param maximumValue The threshold
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isLessThan = function (maximumValue) {
            return this.builder.isLessThan(maximumValue);
        };
        /**
         * Adds a validation rule that checks a value for being equal to a threshold
         * @param otherValue The threshold
         * @param otherValueLabel Optional: a label to use in the validation message
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isEqualTo = function (otherValue, otherValueLabel) {
            return this.builder.isEqualTo(otherValue, otherValueLabel);
        };
        /**
         * Adds a validation rule that checks a value for not being equal to a threshold
         * @param otherValue The threshold
         * @param otherValueLabel Optional: a label to use in the validation message
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isNotEqualTo = function (otherValue, otherValueLabel) {
            return this.builder.isNotEqualTo(otherValue, otherValueLabel);
        };
        /**
         * Adds a validation rule that checks a value for being a valid isEmail address
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isEmail = function () {
            return this.builder.isEmail();
        };
        /**
         * Adds a validation rule that checks a value for being equal to at least one other value in a particular collection
         * @param collection The threshold
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isIn = function (collection) {
            return this.builder.isIn(collection);
        };
        /**
         * Adds a validation rule that checks a value for having a length greater than or equal to a specified threshold
         * @param minimumValue The threshold
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.hasMinLength = function (minimumValue) {
            return this.builder.hasMinLength(minimumValue);
        };
        /**
         * Adds a validation rule that checks a value for having a length less than a specified threshold
         * @param maximumValue The threshold
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.hasMaxLength = function (maximumValue) {
            return this.builder.hasMaxLength(maximumValue);
        };
        /**
         * Adds a validation rule that checks a value for having a length greater than or equal to a specified threshold and less than another threshold
         * @param minimumValue The min threshold
         * @param maximumValue The max threshold
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.hasLengthBetween = function (minimumValue, maximumValue) {
            return this.builder.hasLengthBetween(minimumValue, maximumValue);
        };
        /**
         * Adds a validation rule that checks a value for being numeric, this includes formatted numbers like '-3,600.25'
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isNumber = function () {
            return this.builder.isNumber();
        };
        /**
         * Adds a validation rule that checks a value for being strictly numeric, this excludes formatted numbers like '-3,600.25'
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.containsOnlyDigits = function () {
            return this.builder.containsOnlyDigits();
        };
        ValidationGroup.prototype.containsOnly = function (regex) {
            return this.builder.containsOnly(regex);
        };
        ValidationGroup.prototype.containsOnlyAlpha = function () {
            return this.builder.containsOnlyAlpha();
        };
        ValidationGroup.prototype.containsOnlyAlphaOrWhitespace = function () {
            return this.builder.containsOnlyAlphaOrWhitespace();
        };
        ValidationGroup.prototype.containsOnlyLetters = function () {
            return this.builder.containsOnlyAlpha();
        };
        ValidationGroup.prototype.containsOnlyLettersOrWhitespace = function () {
            return this.builder.containsOnlyAlphaOrWhitespace();
        };
        /**
         * Adds a validation rule that checks a value for only containing alphanumerical characters
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.containsOnlyAlphanumerics = function () {
            return this.builder.containsOnlyAlphanumerics();
        };
        /**
         * Adds a validation rule that checks a value for only containing alphanumerical characters or whitespace
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.containsOnlyAlphanumericsOrWhitespace = function () {
            return this.builder.containsOnlyAlphanumericsOrWhitespace();
        };
        /**
         * Adds a validation rule that checks a value for being a strong password. A strong password contains at least the specified of the following groups: lowercase characters, uppercase characters, digits and special characters.
         * @param minimumComplexityLevel {Number} Optionally, specifiy the number of groups to match. Default is 4.
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.isStrongPassword = function (minimumComplexityLevel) {
            return this.builder.isStrongPassword(minimumComplexityLevel);
        };
        /**
         * Adds a validation rule that checks a value for matching a particular regex
         * @param regex the regex to match
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.matches = function (regex) {
            return this.builder.matches(regex);
        };
        /**
         * Adds a validation rule that checks a value for passing a custom function
         * @param customFunction {Function} The custom function that needs to pass, that takes two arguments: newValue (the value currently being evaluated) and optionally: threshold, and returns true/false.
         * @param threshold {Object} An optional threshold that will be passed to the customFunction
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.passes = function (customFunction, threshold) {
            return this.builder.passes(customFunction, threshold);
        };
        /**
         * Adds the {ValidationRule}
         * @param validationRule {ValudationRule} The rule that needs to pass
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.passesRule = function (validationRule) {
            return this.builder.passesRule(validationRule);
        };
        /**
         * Specifies that the next validation rules only need to be evaluated when the specified conditionExpression is true
         * @param conditionExpression {Function} a function that returns true of false.
         * @param threshold {Object} an optional treshold object that is passed to the conditionExpression
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.if = function (conditionExpression, threshold) {
            return this.builder.if(conditionExpression, threshold);
        };
        /**
         * Specifies that the next validation rules only need to be evaluated when the previously specified conditionExpression is false.
         * See: if(conditionExpression, threshold)
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.else = function () {
            return this.builder.else();
        };
        /**
         * Specifies that the execution of next validation rules no longer depend on the the previously specified conditionExpression.
         * See: if(conditionExpression, threshold)
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.endIf = function () {
            return this.builder.endIf();
        };
        /**
         * Specifies that the next validation rules only need to be evaluated when they are preceded by a case that matches the conditionExpression
         * @param conditionExpression {Function} a function that returns a case label to execute. This is optional, when omitted the case label will be matched using the underlying property's value
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.switch = function (conditionExpression) {
            return this.builder.switch(conditionExpression);
        };
        /**
         * Specifies that the next validation rules only need to be evaluated when the caseLabel matches the value returned by a preceding switch statement
         * See: switch(conditionExpression)
         * @param caseLabel {Object} the case label
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.case = function (caseLabel) {
            return this.builder.case(caseLabel);
        };
        /**
         * Specifies that the next validation rules only need to be evaluated when not other caseLabel matches the value returned by a preceding switch statement
         * See: switch(conditionExpression)
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.default = function () {
            return this.builder.default();
        };
        /**
         * Specifies that the execution of next validation rules no longer depend on the the previously specified conditionExpression.
         * See: switch(conditionExpression)
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.endSwitch = function () {
            return this.builder.endSwitch();
        };
        /**
         * Specifies that the execution of the previous validation rule should use the specified error message if it fails
         * @param message either a static string or a function that takes two arguments: newValue (the value that has been evaluated) and threshold.
         * @returns {ValidationGroup} returns this ValidationGroup, to enable fluent API
         */
        ValidationGroup.prototype.withMessage = function (message) {
            return this.builder.withMessage(message);
        };
        return ValidationGroup;
    })();
    exports.ValidationGroup = ValidationGroup;
});

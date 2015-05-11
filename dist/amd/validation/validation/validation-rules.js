var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../validation/utilities', '../validation/validation-locale'], function (require, exports, utilities_1, validation_locale_1) {
    var ValidationRule = (function () {
        function ValidationRule(threshold, onValidate, message) {
            this.onValidate = onValidate;
            this.threshold = threshold;
            this.message = message;
            this.errorMessage = null;
            this.ruleName = this.constructor.name;
        }
        ValidationRule.prototype.withMessage = function (message) {
            this.message = message;
        };
        ValidationRule.prototype.explain = function () {
            return this.errorMessage;
        };
        ValidationRule.prototype.setResult = function (result, currentValue, locale) {
            if (result === true || result === undefined || result === null || result === '') {
                this.errorMessage = null;
                return true;
            }
            else {
                if (typeof (result) === 'string') {
                    this.errorMessage = result;
                }
                else {
                    if (this.message) {
                        if (typeof (this.message) === 'function') {
                            this.errorMessage = this.message(currentValue, this.threshold);
                        }
                        else if (typeof (this.message) === 'string') {
                            this.errorMessage = this.message;
                        }
                        else
                            throw 'Unable to handle the error message:' + this.message;
                    }
                    else {
                        this.errorMessage = locale.translate(this.ruleName, currentValue, this.threshold);
                    }
                }
                return false;
            }
        };
        /**
         * Validation rules: return a promise that fulfills and resolves to true/false
         */
        ValidationRule.prototype.validate = function (currentValue, locale) {
            var _this = this;
            if (locale === undefined) {
                locale = validation_locale_1.ValidationLocale.Repository.default;
            }
            currentValue = utilities_1.Utilities.getValue(currentValue);
            var result = this.onValidate(currentValue, this.threshold, locale);
            var promise = Promise.resolve(result);
            var nextPromise = promise.then(function (promiseResult) {
                return _this.setResult(promiseResult, currentValue, locale);
            }, function (promiseFailure) {
                if (typeof (promiseFailure) === 'string' && promiseFailure !== '')
                    return _this.setResult(promiseFailure, currentValue, locale);
                else
                    return _this.setResult(false, currentValue, locale);
            });
            return nextPromise;
        };
        return ValidationRule;
    })();
    exports.ValidationRule = ValidationRule;
    var EmailValidationRule = (function (_super) {
        __extends(EmailValidationRule, _super);
        function EmailValidationRule() {
            var _this = this;
            _super.call(this, null, function (newValue, threshold) {
                if (/\s/.test(newValue)) {
                    return false;
                }
                var parts = newValue.split('@');
                var domain = parts.pop();
                var user = parts.join('@');
                if (!_this.isFQDN(domain)) {
                    return false;
                }
                return _this.emailUserUtf8Regex.test(user);
            });
            this.emailUserUtf8Regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))$/i;
            this.isFQDN = function (str) {
                var parts = str.split('.');
                for (var part, i = 0; i < parts.length; i++) {
                    part = parts[i];
                    if (part.indexOf('__') >= 0) {
                        return false;
                    }
                    part = part.replace(/_/g, '');
                    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                        return false;
                    }
                    if (part[0] === '-' || part[part.length - 1] === '-' ||
                        part.indexOf('---') >= 0) {
                        return false;
                    }
                }
                return true;
            };
        }
        return EmailValidationRule;
    })(ValidationRule);
    exports.EmailValidationRule = EmailValidationRule;
    var MinimumLengthValidationRule = (function (_super) {
        __extends(MinimumLengthValidationRule, _super);
        function MinimumLengthValidationRule(minimumLength) {
            _super.call(this, minimumLength, function (newValue, minimumLength) {
                return newValue.length !== undefined && newValue.length >= minimumLength;
            });
        }
        return MinimumLengthValidationRule;
    })(ValidationRule);
    exports.MinimumLengthValidationRule = MinimumLengthValidationRule;
    var MaximumLengthValidationRule = (function (_super) {
        __extends(MaximumLengthValidationRule, _super);
        function MaximumLengthValidationRule(maximumLength) {
            _super.call(this, maximumLength, function (newValue, maximumLength) {
                return newValue.length !== undefined && newValue.length <= maximumLength;
            });
        }
        return MaximumLengthValidationRule;
    })(ValidationRule);
    exports.MaximumLengthValidationRule = MaximumLengthValidationRule;
    var BetweenLengthValidationRule = (function (_super) {
        __extends(BetweenLengthValidationRule, _super);
        function BetweenLengthValidationRule(minimumLength, maximumLength) {
            _super.call(this, { minimumLength: minimumLength, maximumLength: maximumLength }, function (newValue, threshold) {
                return newValue.length !== undefined
                    && newValue.length >= threshold.minimumLength
                    && newValue.length <= threshold.maximumLength;
            });
        }
        return BetweenLengthValidationRule;
    })(ValidationRule);
    exports.BetweenLengthValidationRule = BetweenLengthValidationRule;
    var CustomFunctionValidationRule = (function (_super) {
        __extends(CustomFunctionValidationRule, _super);
        function CustomFunctionValidationRule(customFunction, threshold) {
            _super.call(this, threshold, customFunction);
        }
        return CustomFunctionValidationRule;
    })(ValidationRule);
    exports.CustomFunctionValidationRule = CustomFunctionValidationRule;
    var NumericValidationRule = (function (_super) {
        __extends(NumericValidationRule, _super);
        function NumericValidationRule() {
            _super.call(this, null, function (newValue, threshold, locale) {
                var numericRegex = locale.setting('numericRegex');
                var floatValue = parseFloat(newValue);
                return !Number.isNaN(parseFloat(newValue))
                    && Number.isFinite(floatValue)
                    && numericRegex.test(newValue);
            });
        }
        return NumericValidationRule;
    })(ValidationRule);
    exports.NumericValidationRule = NumericValidationRule;
    var RegexValidationRule = (function (_super) {
        __extends(RegexValidationRule, _super);
        function RegexValidationRule(regex) {
            _super.call(this, regex, function (newValue, regex) {
                return regex.test(newValue);
            });
        }
        return RegexValidationRule;
    })(ValidationRule);
    exports.RegexValidationRule = RegexValidationRule;
    var ContainsOnlyValidationRule = (function (_super) {
        __extends(ContainsOnlyValidationRule, _super);
        function ContainsOnlyValidationRule(regex) {
            _super.call(this, regex);
        }
        return ContainsOnlyValidationRule;
    })(RegexValidationRule);
    exports.ContainsOnlyValidationRule = ContainsOnlyValidationRule;
    var MinimumValueValidationRule = (function (_super) {
        __extends(MinimumValueValidationRule, _super);
        function MinimumValueValidationRule(minimumValue) {
            _super.call(this, minimumValue, function (newValue, minimumValue) {
                return utilities_1.Utilities.getValue(minimumValue) < newValue;
            });
        }
        return MinimumValueValidationRule;
    })(ValidationRule);
    exports.MinimumValueValidationRule = MinimumValueValidationRule;
    var MinimumInclusiveValueValidationRule = (function (_super) {
        __extends(MinimumInclusiveValueValidationRule, _super);
        function MinimumInclusiveValueValidationRule(minimumValue) {
            _super.call(this, minimumValue, function (newValue, minimumValue) {
                return utilities_1.Utilities.getValue(minimumValue) <= newValue;
            });
        }
        return MinimumInclusiveValueValidationRule;
    })(ValidationRule);
    exports.MinimumInclusiveValueValidationRule = MinimumInclusiveValueValidationRule;
    var MaximumValueValidationRule = (function (_super) {
        __extends(MaximumValueValidationRule, _super);
        function MaximumValueValidationRule(maximumValue) {
            _super.call(this, maximumValue, function (newValue, maximumValue) {
                return newValue < utilities_1.Utilities.getValue(maximumValue);
            });
        }
        return MaximumValueValidationRule;
    })(ValidationRule);
    exports.MaximumValueValidationRule = MaximumValueValidationRule;
    var MaximumInclusiveValueValidationRule = (function (_super) {
        __extends(MaximumInclusiveValueValidationRule, _super);
        function MaximumInclusiveValueValidationRule(maximumValue) {
            _super.call(this, maximumValue, function (newValue, maximumValue) {
                return newValue <= utilities_1.Utilities.getValue(maximumValue);
            });
        }
        return MaximumInclusiveValueValidationRule;
    })(ValidationRule);
    exports.MaximumInclusiveValueValidationRule = MaximumInclusiveValueValidationRule;
    var BetweenValueValidationRule = (function (_super) {
        __extends(BetweenValueValidationRule, _super);
        function BetweenValueValidationRule(minimumValue, maximumValue) {
            _super.call(this, { minimumValue: minimumValue, maximumValue: maximumValue }, function (newValue, threshold) {
                return utilities_1.Utilities.getValue(threshold.minimumValue) <= newValue && newValue <= utilities_1.Utilities.getValue(threshold.maximumValue);
            });
        }
        return BetweenValueValidationRule;
    })(ValidationRule);
    exports.BetweenValueValidationRule = BetweenValueValidationRule;
    var DigitValidationRule = (function (_super) {
        __extends(DigitValidationRule, _super);
        function DigitValidationRule() {
            var _this = this;
            _super.call(this, null, function (newValue, threshold) {
                return _this.digitRegex.test(newValue);
            });
            this.digitRegex = /^\d+$/;
        }
        return DigitValidationRule;
    })(ValidationRule);
    exports.DigitValidationRule = DigitValidationRule;
    var AlphaNumericValidationRule = (function (_super) {
        __extends(AlphaNumericValidationRule, _super);
        function AlphaNumericValidationRule() {
            var _this = this;
            _super.call(this, null, function (newValue, threshold) {
                return _this.alphaNumericRegex.test(newValue);
            });
            this.alphaNumericRegex = /^[a-z0-9]+$/i;
        }
        return AlphaNumericValidationRule;
    })(ValidationRule);
    exports.AlphaNumericValidationRule = AlphaNumericValidationRule;
    var AlphaValidationRule = (function (_super) {
        __extends(AlphaValidationRule, _super);
        function AlphaValidationRule() {
            var _this = this;
            _super.call(this, null, function (newValue, threshold) {
                return _this.alphaRegex.test(newValue);
            });
            this.alphaRegex = /^[a-z]+$/i;
        }
        return AlphaValidationRule;
    })(ValidationRule);
    exports.AlphaValidationRule = AlphaValidationRule;
    var AlphaOrWhitespaceValidationRule = (function (_super) {
        __extends(AlphaOrWhitespaceValidationRule, _super);
        function AlphaOrWhitespaceValidationRule() {
            var _this = this;
            _super.call(this, null, function (newValue, threshold) {
                return _this.alphaNumericRegex.test(newValue);
            });
            this.alphaNumericRegex = /^[a-z\s]+$/i;
        }
        return AlphaOrWhitespaceValidationRule;
    })(ValidationRule);
    exports.AlphaOrWhitespaceValidationRule = AlphaOrWhitespaceValidationRule;
    var AlphaNumericOrWhitespaceValidationRule = (function (_super) {
        __extends(AlphaNumericOrWhitespaceValidationRule, _super);
        function AlphaNumericOrWhitespaceValidationRule() {
            var _this = this;
            _super.call(this, null, function (newValue, threshold) {
                return _this.alphaNumericRegex.test(newValue);
            });
            this.alphaNumericRegex = /^[a-z0-9\s]+$/i;
        }
        return AlphaNumericOrWhitespaceValidationRule;
    })(ValidationRule);
    exports.AlphaNumericOrWhitespaceValidationRule = AlphaNumericOrWhitespaceValidationRule;
    var MediumPasswordValidationRule = (function (_super) {
        __extends(MediumPasswordValidationRule, _super);
        function MediumPasswordValidationRule(minimumComplexityLevel) {
            _super.call(this, (minimumComplexityLevel) ? minimumComplexityLevel : 3, function (newValue, threshold) {
                if (typeof (newValue) !== 'string')
                    return false;
                var strength = 0;
                strength += /[A-Z]+/.test(newValue) ? 1 : 0;
                strength += /[a-z]+/.test(newValue) ? 1 : 0;
                strength += /[0-9]+/.test(newValue) ? 1 : 0;
                strength += /[\W]+/.test(newValue) ? 1 : 0;
                return strength >= threshold;
            });
        }
        return MediumPasswordValidationRule;
    })(ValidationRule);
    exports.MediumPasswordValidationRule = MediumPasswordValidationRule;
    var StrongPasswordValidationRule = (function (_super) {
        __extends(StrongPasswordValidationRule, _super);
        function StrongPasswordValidationRule() {
            _super.call(this, 4);
        }
        return StrongPasswordValidationRule;
    })(MediumPasswordValidationRule);
    exports.StrongPasswordValidationRule = StrongPasswordValidationRule;
    var EqualityValidationRuleBase = (function (_super) {
        __extends(EqualityValidationRuleBase, _super);
        function EqualityValidationRuleBase(otherValue, equality, otherValueLabel) {
            _super.call(this, {
                otherValue: otherValue,
                equality: equality,
                otherValueLabel: otherValueLabel
            }, function (newValue, threshold) {
                var otherValue = utilities_1.Utilities.getValue(threshold.otherValue);
                if (newValue instanceof Date && otherValue instanceof Date)
                    return threshold.equality === (newValue.getTime() === otherValue.getTime());
                return threshold.equality === (newValue === otherValue);
            });
        }
        return EqualityValidationRuleBase;
    })(ValidationRule);
    exports.EqualityValidationRuleBase = EqualityValidationRuleBase;
    var EqualityValidationRule = (function (_super) {
        __extends(EqualityValidationRule, _super);
        function EqualityValidationRule(otherValue) {
            _super.call(this, otherValue, true);
        }
        return EqualityValidationRule;
    })(EqualityValidationRuleBase);
    exports.EqualityValidationRule = EqualityValidationRule;
    var EqualityWithOtherLabelValidationRule = (function (_super) {
        __extends(EqualityWithOtherLabelValidationRule, _super);
        function EqualityWithOtherLabelValidationRule(otherValue, otherLabel) {
            _super.call(this, otherValue, true, otherLabel);
        }
        return EqualityWithOtherLabelValidationRule;
    })(EqualityValidationRuleBase);
    exports.EqualityWithOtherLabelValidationRule = EqualityWithOtherLabelValidationRule;
    var InEqualityValidationRule = (function (_super) {
        __extends(InEqualityValidationRule, _super);
        function InEqualityValidationRule(otherValue) {
            _super.call(this, otherValue, false);
        }
        return InEqualityValidationRule;
    })(EqualityValidationRuleBase);
    exports.InEqualityValidationRule = InEqualityValidationRule;
    var InEqualityWithOtherLabelValidationRule = (function (_super) {
        __extends(InEqualityWithOtherLabelValidationRule, _super);
        function InEqualityWithOtherLabelValidationRule(otherValue, otherLabel) {
            _super.call(this, otherValue, false, otherLabel);
        }
        return InEqualityWithOtherLabelValidationRule;
    })(EqualityValidationRuleBase);
    exports.InEqualityWithOtherLabelValidationRule = InEqualityWithOtherLabelValidationRule;
    var InCollectionValidationRule = (function (_super) {
        __extends(InCollectionValidationRule, _super);
        function InCollectionValidationRule(collection) {
            _super.call(this, collection, function (newValue, threshold) {
                var collection = utilities_1.Utilities.getValue(threshold);
                for (var i = 0; i < collection.length; i++) {
                    if (newValue === collection[i])
                        return true;
                }
                return false;
            });
        }
        return InCollectionValidationRule;
    })(ValidationRule);
    exports.InCollectionValidationRule = InCollectionValidationRule;
});

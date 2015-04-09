var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
        ValidationRule.prototype.validate = function (currentValue) {
            if (typeof (currentValue) === 'string') {
                if (String.prototype.trim) {
                    currentValue = currentValue.trim();
                }
                else {
                    currentValue = currentValue.replace(/^\s+|\s+$/g, '');
                }
            }
            var result = this.onValidate(currentValue, this.threshold);
            if (result) {
                this.errorMessage = null;
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
                    this.errorMessage = validation_1.Validation.Locale.translate(this.ruleName, currentValue, this.threshold);
                }
            }
            return result;
        };
        return ValidationRule;
    })();
    exports.ValidationRule = ValidationRule;
    var EmailValidationRule = (function (_super) {
        __extends(EmailValidationRule, _super);
        //https://github.com/chriso/validator.js/blob/master/LICENSE
        function EmailValidationRule() {
            var _this = this;
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
                return newValue.length !== undefined && newValue.length < maximumLength;
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
                    && newValue.length < threshold.maximumLength;
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
            _super.call(this, null, function (newValue) {
                var numericRegex = validation_1.Validation.Locale.setting('numericRegex');
                var floatValue = parseFloat(newValue);
                return !Number.isNaN(parseFloat(floatValue))
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
    var MinimumValueValidationRule = (function (_super) {
        __extends(MinimumValueValidationRule, _super);
        function MinimumValueValidationRule(minimumValue) {
            _super.call(this, minimumValue, function (newValue, minimumValue) {
                return minimumValue <= newValue;
            });
        }
        return MinimumValueValidationRule;
    })(ValidationRule);
    exports.MinimumValueValidationRule = MinimumValueValidationRule;
    var MaximumValueValidationRule = (function (_super) {
        __extends(MaximumValueValidationRule, _super);
        function MaximumValueValidationRule(maximumValue) {
            _super.call(this, maximumValue, function (newValue, maximumValue) {
                return newValue < maximumValue;
            });
        }
        return MaximumValueValidationRule;
    })(ValidationRule);
    exports.MaximumValueValidationRule = MaximumValueValidationRule;
    var BetweenValueValidationRule = (function (_super) {
        __extends(BetweenValueValidationRule, _super);
        function BetweenValueValidationRule(minimumValue, maximumValue) {
            _super.call(this, { minimumValue: minimumValue, maximumValue: maximumValue }, function (newValue, threshold) {
                return threshold.minimumValue <= newValue && newValue < threshold.maximumValue;
            });
        }
        return BetweenValueValidationRule;
    })(ValidationRule);
    exports.BetweenValueValidationRule = BetweenValueValidationRule;
    var DigitValidationRule = (function (_super) {
        __extends(DigitValidationRule, _super);
        function DigitValidationRule() {
            var _this = this;
            this.digitRegex = /^\d+$/;
            _super.call(this, null, function (newValue, threshold) {
                return _this.digitRegex.test(newValue);
            });
        }
        return DigitValidationRule;
    })(ValidationRule);
    exports.DigitValidationRule = DigitValidationRule;
    var AlphaNumericValidationRule = (function (_super) {
        __extends(AlphaNumericValidationRule, _super);
        function AlphaNumericValidationRule() {
            var _this = this;
            this.alphaNumericRegex = /^[a-z0-9]+$/i;
            _super.call(this, null, function (newValue, threshold) {
                return _this.alphaNumericRegex.test(newValue);
            });
        }
        return AlphaNumericValidationRule;
    })(ValidationRule);
    exports.AlphaNumericValidationRule = AlphaNumericValidationRule;
    var AlphaNumericOrWhitespaceValidationRule = (function (_super) {
        __extends(AlphaNumericOrWhitespaceValidationRule, _super);
        function AlphaNumericOrWhitespaceValidationRule() {
            var _this = this;
            this.alphaNumericRegex = /^[a-z0-9\s]+$/i;
            _super.call(this, null, function (newValue, threshold) {
                return _this.alphaNumericRegex.test(newValue);
            });
        }
        return AlphaNumericOrWhitespaceValidationRule;
    })(ValidationRule);
    exports.AlphaNumericOrWhitespaceValidationRule = AlphaNumericOrWhitespaceValidationRule;
    var StrongPasswordValidationRule = (function (_super) {
        __extends(StrongPasswordValidationRule, _super);
        function StrongPasswordValidationRule(minimumComplexityLevel) {
            var complexityLevel = 4;
            if (minimumComplexityLevel && minimumComplexityLevel > 1 && minimumComplexityLevel < 4)
                complexityLevel = minimumComplexityLevel;
            _super.call(this, complexityLevel, function (newValue, threshold) {
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
        return StrongPasswordValidationRule;
    })(ValidationRule);
    exports.StrongPasswordValidationRule = StrongPasswordValidationRule;
    var EqualityValidationRule = (function (_super) {
        __extends(EqualityValidationRule, _super);
        function EqualityValidationRule(otherValue, equality, otherValueLabel) {
            _super.call(this, {
                otherValue: otherValue,
                equality: equality,
                otherValueLabel: otherValueLabel
            }, function (newValue, threshold) {
                if (newValue instanceof Date && threshold.otherValue instanceof Date)
                    return threshold.equality === (newValue.getTime() === threshold.otherValue.getTime());
                return threshold.equality === (newValue === threshold.otherValue);
            });
        }
        return EqualityValidationRule;
    })(ValidationRule);
    exports.EqualityValidationRule = EqualityValidationRule;
    var InCollectionValidationRule = (function (_super) {
        __extends(InCollectionValidationRule, _super);
        function InCollectionValidationRule(collection) {
            _super.call(this, collection, function (newValue, threshold) {
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

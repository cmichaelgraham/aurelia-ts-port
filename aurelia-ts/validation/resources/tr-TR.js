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
define(["require", "exports"], function (require, exports) {
    exports.data = {
        settings: {
            'numericRegex': /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
        },
        messages: {
            'isRequired': 'gereklidir',
            'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                return "sadece alfanumerik karakterler veya bo\u015Fluk girebilirsiniz";
            },
            'AlphaNumericValidationRule': function (newValue, threshold) {
                return "sadece alfanumerik karakterleri girebilirsiniz";
            },
            'BetweenLengthValidationRule': function (newValue, threshold) {
                return "uzunlu\u011Fu " + threshold.minimumLength + " ile " + threshold.maximumLength + " aras\u0131nda olmal\u0131d\u0131r";
            },
            'BetweenValueValidationRule': function (newValue, threshold) {
                return threshold.minimumValue + " ile " + threshold.maximumValue + " aras\u0131nda bir de\u011Fer giriniz";
            },
            'CustomFunctionValidationRule': function (newValue, threshold) {
                return "ge\u00E7erli bir de\u011Fer giriniz";
            },
            'DigitValidationRule': function (newValue, threshold) {
                return "sadece rakam girebilirsiniz";
            },
            'EmailValidationRule': function (newValue, threshold) {
                return "ge\u00E7erli bir e-posta giriniz";
            },
            'EqualityValidationRule': function (newValue, threshold) {
                if (threshold.otherValueLabel)
                    if (threshold.equality)
                        return "de\u011Fer " + threshold.otherValueLabel + "''e e\u015Fit olmal\u0131d\u0131r";
                    else
                        return "de\u011Fer " + threshold.otherValueLabel + "''den farkl\u0131 olmal\u0131d\u0131r";
                else if (threshold.equality)
                    return "de\u011Fer " + threshold.otherValue + "''e e\u015Fit olmal\u0131d\u0131r";
                else
                    return "de\u011Fer " + threshold.otherValue + "''den farkl\u0131 olmal\u0131d\u0131r";
            },
            'InCollectionValidationRule': function (newValue, threshold) {
                return "ge\u00E7ersiz de\u011Fer";
            },
            'MinimumLengthValidationRule': function (newValue, threshold) {
                return "de\u011Fer en az " + threshold + " karakter uzunlu\u011Funda olmal\u0131d\u0131r";
            },
            'MinimumValueValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + threshold + " veya daha fazla olmal\u0131d\u0131r";
            },
            'MaximumLengthValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + threshold + " karakterden uzun olmamal\u0131d\u0131r";
            },
            'MaximumValueValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + threshold + "''dan az olmal\u0131";
            },
            'NumericValidationRule': function (newValue, threshold) {
                return "sadece say\u0131 girebilirsiniz";
            },
            'RegexValidationRule': function (newValue, threshold) {
                return "ge\u00E7erli bir de\u011Fer giriniz";
            },
            'StrongPasswordValidationRule': function (newValue, threshold) {
                if (threshold == 4)
                    return "k\u00FC\u00E7\u00FCk harfler, b\u00FCy\u00FCk harfler, say\u0131lar ve i\u015Faretlerin birle\u015Fimi olmal\u0131d\u0131r";
                else
                    return "k\u00FC\u00E7\u00FCk harfler, b\u00FCy\u00FCk harfler, say\u0131lar veya i\u015Faretlerden en az " + threshold + " de\u011Fi\u015Fik tip olmal\u0131";
            }
        }
    };
});

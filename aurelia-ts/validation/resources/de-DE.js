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
            'isRequired': 'wird benötigt',
            'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                return "darf nur alphanumerische Zeichen oder Leerzeichen beinhalten";
            },
            'AlphaNumericValidationRule': function (newValue, threshold) {
                return "darf nur alphanumerische Zeichen beinhalten";
            },
            'BetweenLengthValidationRule': function (newValue, threshold) {
                return "muss zwischen " + threshold.minimumLength + " und " + threshold.maximumLength + " Zeichen lang sein";
            },
            'BetweenValueValidationRule': function (newValue, threshold) {
                return "muss zwischen " + threshold.minimumValue + " und " + threshold.maximumValue + " sein";
            },
            'CustomFunctionValidationRule': function (newValue, threshold) {
                return "ist kein g\u00FCltiger Wert";
            },
            'DigitValidationRule': function (newValue, threshold) {
                return "darf nur Zahlen beinhalten";
            },
            'EmailValidationRule': function (newValue, threshold) {
                return "ist keine g\u00FCltige Email-Adresse";
            },
            'EqualityValidationRule': function (newValue, threshold) {
                if (threshold.otherValueLabel)
                    if (threshold.equality)
                        return "entspricht nicht " + threshold.otherValueLabel;
                    else
                        return "darf nicht mit " + threshold.otherValueLabel + " \u00FCbereinstimmen";
                else if (threshold.equality)
                    return "sollte " + threshold.otherValue + " sein";
                else
                    return "sollte nicht " + threshold.otherValue + " sein";
            },
            'InCollectionValidationRule': function (newValue, threshold) {
                return "ist kein g\u00FCltiger Wert";
            },
            'MinimumLengthValidationRule': function (newValue, threshold) {
                return "muss mindestens " + threshold + " Zeichen lang sein";
            },
            'MinimumValueValidationRule': function (newValue, threshold) {
                return "sollte " + threshold + " oder mehr sein";
            },
            'MaximumLengthValidationRule': function (newValue, threshold) {
                return "darf nicht l\u00E4nger als " + threshold + " Zeichen sein";
            },
            'MaximumValueValidationRule': function (newValue, threshold) {
                return "muss geringer als " + threshold + " sein";
            },
            'NumericValidationRule': function (newValue, threshold) {
                return "muss eine Nummer sein";
            },
            'RegexValidationRule': function (newValue, threshold) {
                return "ist kein g\u00FCltiger Wert";
            },
            'StrongPasswordValidationRule': function (newValue, threshold) {
                if (threshold == 4)
                    return "sollte eine Kombination aus Gro\u00DF- und Kleinbuchstaben, sowie Zahlen und Sonderzeichen enthalten";
                else
                    return "sollte zumindest " + threshold + " der folgenden Gruppen enthalten: Kleinbuchstaben, Gro\u00DFbuchstaben, Zahlen oder Sonderzeichen";
            }
        }
    };
});

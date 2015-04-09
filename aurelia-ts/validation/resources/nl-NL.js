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
            'numericRegex': /^-?(?:\d+)(?:\,\d+)?$/
        },
        messages: {
            'isRequired': 'is verplicht',
            'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                return "kan enkel alfanumerieke tekens of spaties bevatten";
            },
            'AlphaNumericValidationRule': function (newValue, threshold) {
                return "kan enkel alfanumerieke tekens bevatten";
            },
            'BetweenLengthValidationRule': function (newValue, threshold) {
                return "moet tussen " + threshold.minimumLength + " en " + threshold.maximumLength + " tekens lang zijn";
            },
            'BetweenValueValidationRule': function (newValue, threshold) {
                return "moet tussen " + threshold.minimumValue + " en " + threshold.maximumValue + " zijn";
            },
            'DigitValidationRule': function (newValue, threshold) {
                return "mag enkel cijfers bevatten";
            },
            'CustomFunctionValidationRule': function (newValue, threshold) {
                return "geen geldige waarde";
            },
            'EmailValidationRule': function (newValue, threshold) {
                return "is geen geldig email adres";
            },
            'EqualityValidationRule': function (newValue, threshold) {
                if (threshold.otherValueLabel)
                    if (threshold.equality)
                        return "moet overeen komen met " + threshold.otherValueLabel;
                    else
                        return "mag niet overeen komen met " + threshold.otherValueLabel;
                else if (threshold.equality)
                    return "moet " + threshold.otherValue + " zijn";
                else
                    return "mag niet " + threshold.otherValue + " zijn";
            },
            'InCollectionValidationRule': function (newValue, threshold) {
                return "is geen geldige waarde";
            },
            'MinimumLengthValidationRule': function (newValue, threshold) {
                return "moet op zijn minst " + threshold + " tekens lang zijn";
            },
            'MinimumValueValidationRule': function (newValue, threshold) {
                return "moet op zijn minst " + threshold + " zijn";
            },
            'MaximumLengthValidationRule': function (newValue, threshold) {
                return "moet minder dan " + threshold + " tekens lang zijn";
            },
            'MaximumValueValidationRule': function (newValue, threshold) {
                return "moet minder dan " + threshold + " zijn";
            },
            'NumericValidationRule': function (newValue, threshold) {
                return "moet een getal zijn";
            },
            'RegexValidationRule': function (newValue, threshold) {
                return "is geen geldige waarde";
            },
            'StrongPasswordValidationRule': function (newValue, threshold) {
                if (threshold == 4)
                    return "moet een combinatie van letters, hoofdletters, cijfers en speciale tekens zijn";
                else
                    return "moet op zijn minst " + threshold + " van de volgende groupen bevatten: letters, hoofdletters, cijfers of speciale tekens";
            }
        }
    };
});

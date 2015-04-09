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
            'isRequired': 'est obligatoire',
            'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                return "ne peut contenir que des caract\u00E8res alphanum\u00E9riques ou des espaces";
            },
            'AlphaNumericValidationRule': function (newValue, threshold) {
                return "ne peut contenir que des caract\u00E8res alphanum\u00E9riques";
            },
            'BetweenLengthValidationRule': function (newValue, threshold) {
                return "doit contenir de " + threshold.minimumLength + " \u00E0 " + threshold.maximumLength + " caract\u00E8res";
            },
            'BetweenValueValidationRule': function (newValue, threshold) {
                return "doit \u00EAtre entre " + threshold.minimumValue + " et " + threshold.maximumValue;
            },
            'CustomFunctionValidationRule': function (newValue, threshold) {
                return "n'est pas une valeur valide";
            },
            'DigitValidationRule': function (newValue, threshold) {
                return "doit contenir uniquement des caract\u00E8res num\u00E9riques";
            },
            'EmailValidationRule': function (newValue, threshold) {
                return "n'est pas une adresse email valide";
            },
            'EqualityValidationRule': function (newValue, threshold) {
                if (threshold.otherValueLabel)
                    if (threshold.equality)
                        return "doit correspondre \u00E0 " + threshold.otherValueLabel;
                    else
                        return "ne doit pas correspondre \u00E0 " + threshold.otherValueLabel;
                else if (threshold.equality)
                    return "doit \u00EAtre " + threshold.otherValue;
                else
                    return "ne doit pas \u00EAtre " + threshold.otherValue;
            },
            'InCollectionValidationRule': function (newValue, threshold) {
                return "n'est pas une valeur valide";
            },
            'MinimumLengthValidationRule': function (newValue, threshold) {
                return "doit contenir au moins " + threshold + " caract\u00E8res";
            },
            'MinimumValueValidationRule': function (newValue, threshold) {
                return "doit \u00EAtre " + threshold + " ou plus";
            },
            'MaximumLengthValidationRule': function (newValue, threshold) {
                return "ne doit pas contenir plus de " + threshold + " caract\u00E8res";
            },
            'MaximumValueValidationRule': function (newValue, threshold) {
                return "doit \u00EAtre moins que " + threshold;
            },
            'NumericValidationRule': function (newValue, threshold) {
                return "doit \u00EAtre une valeur num\u00E9rique";
            },
            'RegexValidationRule': function (newValue, threshold) {
                return "n'est pas une valeur valide";
            },
            'StrongPasswordValidationRule': function (newValue, threshold) {
                if (threshold == 4)
                    return "doit contenir une combinaison de lettres minuscules, de lettres majuscules, de caract\u00E8res num\u00E9riques et de caract\u00E8res sp\u00E9ciaux";
                else
                    return "doit contenir au moins " + threshold + " des caract\u00E9ristiques suivantes : lettres minuscules, lettres majuscules, caract\u00E8res num\u00E9riques ou caract\u00E8res sp\u00E9ciaux";
            }
        }
    };
});

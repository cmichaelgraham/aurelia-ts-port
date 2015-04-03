define(["require", "exports"], function (require, exports) {
    exports.data = {
        settings: {
            'numericRegex': /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
        },
        messages: {
            'isRequired': 'est obligatoire',
            'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                return "ne peut contenir que des caract\u00E8res de type num\u00E9rique ou alphab\u00E9tique ou avec des espaces";
            },
            'AlphaNumericValidationRule': function (newValue, threshold) {
                return "ne peut contenir que des caract\u00E8res de type num\u00E9rique ou alphab\u00E9tique";
            },
            'BetweenLengthValidationRule': function (newValue, threshold) {
                return "doit \u00EAtre compris entre between " + threshold.minimumLength + " et " + threshold.maximumLength + " carat\u00E8res";
            },
            'BetweenValueValidationRule': function (newValue, threshold) {
                return "doit \u00EAtre entre " + threshold.minimumValue + " et " + threshold.maximumValue;
            },
            'CustomFunctionValidationRule': function (newValue, threshold) {
                return "n'est pas une valeur valide";
            },
            'DigitValidationRule': function (newValue, threshold) {
                return "doit contenir uniquement des valeurs nurm\u00E9rique";
            },
            'EmailValidationRule': function (newValue, threshold) {
                return "n'est pas une email valide";
            },
            'EqualityValidationRule': function (newValue, threshold) {
                if (threshold.otherValueLabel)
                    if (threshold.equality)
                        return "ne correspond pas " + threshold.otherValueLabel;
                    else
                        return "ne peut pas correspondre " + threshold.otherValueLabel;
                else if (threshold.equality)
                    return "devrait \u00EAtre " + threshold.otherValue;
                else
                    return "ne peut \u00EAtre " + threshold.otherValue;
            },
            'InCollectionValidationRule': function (newValue, threshold) {
                return "n'est pas une valeur valide";
            },
            'MinimumLengthValidationRule': function (newValue, threshold) {
                return "doit avoir au moins " + threshold + " carat\u00E8res";
            },
            'MinimumValueValidationRule': function (newValue, threshold) {
                return "doit \u00EAtre " + threshold + " ou plus";
            },
            'MaximumLengthValidationRule': function (newValue, threshold) {
                return "ne peut \u00EAtre plus long que " + threshold + " caract\u00E8res";
            },
            'MaximumValueValidationRule': function (newValue, threshold) {
                return "doit \u00EAtre moins que " + threshold;
            },
            'NumericValidationRule': function (newValue, threshold) {
                return "doit \u00EAtre num\u00E9rique";
            },
            'RegexValidationRule': function (newValue, threshold) {
                return "n'est pas une valeur valide";
            },
            'StrongPasswordValidationRule': function (newValue, threshold) {
                if (threshold == 4)
                    return "devrait contenir une combinaison de lettres en miniscule, majuscule, num\u00E9rique et des caract\u00E8res sp\u00E9ciaux";
                else
                    return "devrait contenir au moins " + threshold + " les caract\u00E9ristiques suivants: lettres minuscule, lettres majuscule, caract\u00E8res num\u00E9rique ou scp\u00E9ciaux";
            }
        }
    };
});

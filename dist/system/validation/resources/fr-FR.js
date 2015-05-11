System.register(['../validation/utilities'], function(exports_1) {
    var utilities_1;
    var data;
    return {
        setters:[
            function (_utilities_1) {
                utilities_1 = _utilities_1;
            }],
        execute: function() {
            exports_1("data", data = {
                settings: {
                    'numericRegex': /^-?(?:\d+)(?:\,\d+)?$/
                },
                messages: {
                    'isRequired': 'est obligatoire',
                    'onValidateCallback': "n'est pas une valeur valide",
                    'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                        return "ne peut contenir que des caract\u00E8res alphanum\u00E9riques ou des espaces";
                    },
                    'AlphaNumericValidationRule': function (newValue, threshold) {
                        return "ne peut contenir que des caract\u00E8res alphanum\u00E9riques";
                    },
                    'AlphaValidationRule': function (newValue, threshold) {
                        return "ne peut contenir que des lettres";
                    },
                    'AlphaOrWhitespaceValidationRule': function (newValue, threshold) {
                        return "ne peut contenir que des lettres ou des espaces";
                    },
                    'BetweenLengthValidationRule': function (newValue, threshold) {
                        return "doit contenir de " + utilities_1.Utilities.getValue(threshold.minimumLength) + " \u00E0 " + utilities_1.Utilities.getValue(threshold.maximumLength) + " caract\u00E8res";
                    },
                    'BetweenValueValidationRule': function (newValue, threshold) {
                        return "doit \u00EAtre entre " + utilities_1.Utilities.getValue(threshold.minimumValue) + " et " + utilities_1.Utilities.getValue(threshold.maximumValue);
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
                        return "doit \u00EAtre " + utilities_1.Utilities.getValue(threshold.otherValue);
                    },
                    'InEqualityValidationRule': function (newValue, threshold) {
                        return "ne peut pas \u00EAtre " + utilities_1.Utilities.getValue(threshold.otherValue);
                    },
                    'EqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                        return "doit correspondre \u00E0 " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
                    },
                    'InEqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                        return "ne doit pas correspondre \u00E0 " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
                    },
                    'InCollectionValidationRule': function (newValue, threshold) {
                        return "n'est pas une valeur valide";
                    },
                    'MinimumInclusiveValueValidationRule': function (newValue, threshold) {
                        return "doit \u00EAtre " + utilities_1.Utilities.getValue(threshold) + " ou plus";
                    },
                    'MinimumLengthValidationRule': function (newValue, threshold) {
                        return "doit contenir au moins " + utilities_1.Utilities.getValue(threshold) + " caract\u00E8res";
                    },
                    'MinimumValueValidationRule': function (newValue, threshold) {
                        return "doit \u00EAtre plus que " + utilities_1.Utilities.getValue(threshold);
                    },
                    'MaximumInclusiveValueValidationRule': function (newValue, threshold) {
                        return "doit \u00EAtre moins que " + utilities_1.Utilities.getValue(threshold);
                    },
                    'MaximumLengthValidationRule': function (newValue, threshold) {
                        return "ne doit pas contenir plus de " + utilities_1.Utilities.getValue(threshold) + " caract\u00E8res";
                    },
                    'MaximumValueValidationRule': function (newValue, threshold) {
                        return "doit \u00EAtre " + utilities_1.Utilities.getValue(threshold) + " ou moins";
                    },
                    'NumericValidationRule': function (newValue, threshold) {
                        return "doit \u00EAtre une valeur num\u00E9rique";
                    },
                    'RegexValidationRule': function (newValue, threshold) {
                        return "n'est pas une valeur valide";
                    },
                    'ContainsOnlyValidationRule': function (newValue, threshold) {
                        return "n'est pas une valeur valide";
                    },
                    'StrongPasswordValidationRule': function (newValue, threshold) {
                        return "doit contenir une combinaison de lettres minuscules, de lettres majuscules, de caract\u00E8res num\u00E9riques et de caract\u00E8res sp\u00E9ciaux";
                    },
                    'MediumPasswordValidationRule': function (newValue, threshold) {
                        return "doit contenir au moins " + utilities_1.Utilities.getValue(threshold) + " des caract\u00E9ristiques suivantes : lettres minuscules, lettres majuscules, caract\u00E8res num\u00E9riques ou caract\u00E8res sp\u00E9ciaux";
                    }
                }
            });
        }
    }
});

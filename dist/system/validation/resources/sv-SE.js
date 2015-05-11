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
                    'isRequired': 'är obligatoriskt',
                    'onValidateCallback': 'är inte ett giltigt värde',
                    'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                        return "kan enbart inneh\u00E5lla alfanumeriska tecken eller mellanslag";
                    },
                    'AlphaNumericValidationRule': function (newValue, threshold) {
                        return "kan enbart inneh\u00E5lla alfanumeriska tecken";
                    },
                    'AlphaValidationRule': function (newValue, threshold) {
                        return "kan enbart inneh\u00E5lla bokst\u00E4ver eller mellanslag";
                    },
                    'AlphaOrWhitespaceValidationRule': function (newValue, threshold) {
                        return "kan enbart inneh\u00E5lla bokst\u00E4ver";
                    },
                    'BetweenLengthValidationRule': function (newValue, threshold) {
                        return "m\u00E5ste vara mellan " + utilities_1.Utilities.getValue(threshold.minimumLength) + " och " + utilities_1.Utilities.getValue(threshold.maximumLength) + " tecken l\u00E5ngt";
                    },
                    'BetweenValueValidationRule': function (newValue, threshold) {
                        return "m\u00E5ste vara mellan " + utilities_1.Utilities.getValue(threshold.minimumValue) + " och " + utilities_1.Utilities.getValue(threshold.maximumValue);
                    },
                    'CustomFunctionValidationRule': function (newValue, threshold) {
                        return "\u00E4r inte ett giltigt v\u00E4rde";
                    },
                    'DigitValidationRule': function (newValue, threshold) {
                        return "kan bara inneh\u00E5lla siffror";
                    },
                    'EmailValidationRule': function (newValue, threshold) {
                        return "\u00E4r inte en giltig e-postadress";
                    },
                    'EqualityValidationRule': function (newValue, threshold) {
                        return "ska vara " + utilities_1.Utilities.getValue(threshold.otherValue);
                    },
                    'InEqualityValidationRule': function (newValue, threshold) {
                        return "kan inte vara " + utilities_1.Utilities.getValue(threshold.otherValue);
                    },
                    'EqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                        return "matchar inte " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
                    },
                    'InEqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                        return "f\u00E5r inte matcha " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
                    },
                    'InCollectionValidationRule': function (newValue, threshold) {
                        return "\u00E4r inget giltigt v\u00E4rde";
                    },
                    'MinimumInclusiveValueValidationRule': function (newValue, threshold) {
                        return "m\u00E5ste vara " + utilities_1.Utilities.getValue(threshold) + " eller mer";
                    },
                    'MinimumLengthValidationRule': function (newValue, threshold) {
                        return "beh\u00F6ver vara minst " + utilities_1.Utilities.getValue(threshold) + " tecken l\u00E5ngt";
                    },
                    'MinimumValueValidationRule': function (newValue, threshold) {
                        return "m\u00E5ste vara mer \u00E4n " + utilities_1.Utilities.getValue(threshold);
                    },
                    'MaximumInclusiveValueValidationRule': function (newValue, threshold) {
                        return "m\u00E5ste vara " + utilities_1.Utilities.getValue(threshold) + " eller mindre";
                    },
                    'MaximumLengthValidationRule': function (newValue, threshold) {
                        return "kan inte vara l\u00E4ngre \u00E4n " + utilities_1.Utilities.getValue(threshold) + " tecken";
                    },
                    'MaximumValueValidationRule': function (newValue, threshold) {
                        return "m\u00E5ste vara mindre \u00E4n " + utilities_1.Utilities.getValue(threshold);
                    },
                    'NumericValidationRule': function (newValue, threshold) {
                        return "m\u00E5ste vara ett nummer";
                    },
                    'RegexValidationRule': function (newValue, threshold) {
                        return "\u00E4r inte ett giltigt v\u00E4rde";
                    },
                    'ContainsOnlyValidationRule': function (newValue, threshold) {
                        return "\u00E4r inte ett giltigt v\u00E4rde";
                    },
                    'StrongPasswordValidationRule': function (newValue, threshold) {
                        return "ska inneh\u00E5lla en kombination av gemener, versaler, siffror och specialtecken";
                    },
                    'MediumPasswordValidationRule': function (newValue, threshold) {
                        return "ska inneh\u00E5lla minst " + utilities_1.Utilities.getValue(threshold) + " av f\u00F6ljande grupperingar: gemener, versaler, siffror eller specialtecken";
                    }
                }
            });
        }
    }
});

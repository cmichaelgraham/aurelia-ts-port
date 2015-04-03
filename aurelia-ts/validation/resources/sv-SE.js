define(["require", "exports"], function (require, exports) {
    exports.data = {
        settings: {
            'numericRegex': /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
        },
        messages: {
            'isRequired': 'är obligatoriskt',
            'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                return "kan enbart inneh\u00E5lla alfanumeriska tecken eller mellanslag";
            },
            'AlphaNumericValidationRule': function (newValue, threshold) {
                return "kan enbart inneh\u00E5lla alfanumeriska tecken";
            },
            'BetweenLengthValidationRule': function (newValue, threshold) {
                return "m\u00E5ste vara mellan " + threshold.minimumLength + " och " + threshold.maximumLength + " tecken l\u00E5ngt";
            },
            'BetweenValueValidationRule': function (newValue, threshold) {
                return "m\u00E5ste vara mellan " + threshold.minimumValue + " och " + threshold.maximumValue;
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
                if (threshold.otherValueLabel)
                    if (threshold.equality)
                        return "matchar inte " + threshold.otherValueLabel;
                    else
                        return "f\u00E5r inte matcha " + threshold.otherValueLabel;
                else if (threshold.equality)
                    return "ska vara " + threshold.otherValue;
                else
                    return "kan inte vara " + threshold.otherValue;
            },
            'InCollectionValidationRule': function (newValue, threshold) {
                return "\u00E4r inget giltigt v\u00E4rde";
            },
            'MinimumLengthValidationRule': function (newValue, threshold) {
                return "beh\u00F6ver vara minst " + threshold + " tecken l\u00E5ngt";
            },
            'MinimumValueValidationRule': function (newValue, threshold) {
                return "m\u00E5ste vara " + threshold + " eller mer";
            },
            'MaximumLengthValidationRule': function (newValue, threshold) {
                return "kan inte vara l\u00E4ngre \u00E4n " + threshold + " tecken";
            },
            'MaximumValueValidationRule': function (newValue, threshold) {
                return "m\u00E5ste vara mindre \u00E4n " + threshold;
            },
            'NumericValidationRule': function (newValue, threshold) {
                return "m\u00E5ste vara ett nummer";
            },
            'RegexValidationRule': function (newValue, threshold) {
                return "\u00E4r inte ett giltigt v\u00E4rde";
            },
            'StrongPasswordValidationRule': function (newValue, threshold) {
                if (threshold == 4)
                    return "ska inneh\u00E5lla en kombination av gemener, versaler, siffror och specialtecken";
                else
                    return "ska inneh\u00E5lla minst " + threshold + " av f\u00F6ljande grupperingar: gemener, versaler, siffror eller specialtecken";
            }
        }
    };
});

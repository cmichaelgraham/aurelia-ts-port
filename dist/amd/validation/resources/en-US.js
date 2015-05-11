define(["require", "exports", '../validation/utilities'], function (require, exports, utilities_1) {
    exports.data = {
        settings: {
            'numericRegex': /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
        },
        messages: {
            'isRequired': 'is required',
            'onValidateCallback': 'not a valid value',
            'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                return "can contain only alphanumerical characters or spaces";
            },
            'AlphaNumericValidationRule': function (newValue, threshold) {
                return "can contain only alphanumerical characters";
            },
            'AlphaValidationRule': function (newValue, threshold) {
                return "can contain only letters";
            },
            'AlphaOrWhitespaceValidationRule': function (newValue, threshold) {
                return "can contain only letters or spaces";
            },
            'BetweenLengthValidationRule': function (newValue, threshold) {
                return "needs to be between " + utilities_1.Utilities.getValue(threshold.minimumLength) + " and " + utilities_1.Utilities.getValue(threshold.maximumLength) + " characters long";
            },
            'BetweenValueValidationRule': function (newValue, threshold) {
                return "needs to be between " + utilities_1.Utilities.getValue(threshold.minimumValue) + " and " + utilities_1.Utilities.getValue(threshold.maximumValue);
            },
            'CustomFunctionValidationRule': function (newValue, threshold) {
                return "not a valid value";
            },
            'DigitValidationRule': function (newValue, threshold) {
                return "can contain only digits";
            },
            'EmailValidationRule': function (newValue, threshold) {
                return "is not a valid email address";
            },
            'EqualityValidationRule': function (newValue, threshold) {
                return "should be " + utilities_1.Utilities.getValue(threshold.otherValue);
            },
            'InEqualityValidationRule': function (newValue, threshold) {
                return "cannot be " + utilities_1.Utilities.getValue(threshold.otherValue);
            },
            'EqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                return "does not match " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
            },
            'InEqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                return "cannot match " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
            },
            'InCollectionValidationRule': function (newValue, threshold) {
                return "not a valid value";
            },
            'MinimumInclusiveValueValidationRule': function (newValue, threshold) {
                return "needs to be " + utilities_1.Utilities.getValue(threshold) + " or more";
            },
            'MinimumLengthValidationRule': function (newValue, threshold) {
                return "needs to be at least " + utilities_1.Utilities.getValue(threshold) + " characters long";
            },
            'MinimumValueValidationRule': function (newValue, threshold) {
                return "needs to be more than " + utilities_1.Utilities.getValue(threshold);
            },
            'MaximumInclusiveValueValidationRule': function (newValue, threshold) {
                return "needs to be " + utilities_1.Utilities.getValue(threshold) + " or less";
            },
            'MaximumLengthValidationRule': function (newValue, threshold) {
                return "cannot be longer then " + utilities_1.Utilities.getValue(threshold) + " characters";
            },
            'MaximumValueValidationRule': function (newValue, threshold) {
                return "needs to be less than " + utilities_1.Utilities.getValue(threshold);
            },
            'NumericValidationRule': function (newValue, threshold) {
                return "needs to be a number";
            },
            'RegexValidationRule': function (newValue, threshold) {
                return "not a valid value";
            },
            'ContainsOnlyValidationRule': function (newValue, threshold) {
                return "not a valid value";
            },
            'StrongPasswordValidationRule': function (newValue, threshold) {
                return "should contain a combination of lowercase letters, uppercase letters, digits and special characters";
            },
            'MediumPasswordValidationRule': function (newValue, threshold) {
                return "should contain at least " + utilities_1.Utilities.getValue(threshold) + " of the following groups: lowercase letters, uppercase letters, digits or special characters";
            }
        }
    };
});

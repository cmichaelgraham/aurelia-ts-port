var utilities_1 = require('../validation/utilities');
exports.data = {
    settings: {
        'numericRegex': /^-?(?:\d+)(?:\,\d+)?$/
    },
    messages: {
        'isRequired': 'is verplicht',
        'onValidateCallback': 'geen geldige waarde',
        'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
            return "kan enkel alfanumerieke tekens of spaties bevatten";
        },
        'AlphaNumericValidationRule': function (newValue, threshold) {
            return "kan enkel alfanumerieke tekens bevatten";
        },
        'AlphaValidationRule': function (newValue, threshold) {
            return "kan enkel letters bevatten";
        },
        'AlphaOrWhitespaceValidationRule': function (newValue, threshold) {
            return "kan enkel letters of spaties bevatten";
        },
        'BetweenLengthValidationRule': function (newValue, threshold) {
            return "moet tussen " + utilities_1.Utilities.getValue(threshold.minimumLength) + " en " + utilities_1.Utilities.getValue(threshold.maximumLength) + " tekens lang zijn";
        },
        'BetweenValueValidationRule': function (newValue, threshold) {
            return "moet tussen " + utilities_1.Utilities.getValue(threshold.minimumValue) + " en " + utilities_1.Utilities.getValue(threshold.maximumValue) + " zijn";
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
            return "moet " + utilities_1.Utilities.getValue(threshold.otherValue) + " zijn";
        },
        'InEqualityValidationRule': function (newValue, threshold) {
            return "mag niet " + utilities_1.Utilities.getValue(threshold.otherValue) + " zijn";
        },
        'EqualityWithOtherLabelValidationRule': function (newValue, threshold) {
            return "moet overeen komen met " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
        },
        'InEqualityWithOtherLabelValidationRule': function (newValue, threshold) {
            return "mag niet overeen komen met " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
        },
        'InCollectionValidationRule': function (newValue, threshold) {
            return "is geen geldige waarde";
        },
        'MinimumInclusiveValueValidationRule': function (newValue, threshold) {
            return "moet op zijn minst " + utilities_1.Utilities.getValue(threshold) + " zijn";
        },
        'MinimumLengthValidationRule': function (newValue, threshold) {
            return "moet op zijn minst " + utilities_1.Utilities.getValue(threshold) + " tekens lang zijn";
        },
        'MinimumValueValidationRule': function (newValue, threshold) {
            return "moet op meer dan " + utilities_1.Utilities.getValue(threshold) + " zijn";
        },
        'MaximumInclusiveValueValidationRule': function (newValue, threshold) {
            return "moet op zijn meest " + utilities_1.Utilities.getValue(threshold) + " zijn";
        },
        'MaximumLengthValidationRule': function (newValue, threshold) {
            return "moet minder dan " + utilities_1.Utilities.getValue(threshold) + " tekens lang zijn";
        },
        'MaximumValueValidationRule': function (newValue, threshold) {
            return "moet minder dan " + utilities_1.Utilities.getValue(threshold) + " zijn";
        },
        'NumericValidationRule': function (newValue, threshold) {
            return "moet een getal zijn";
        },
        'RegexValidationRule': function (newValue, threshold) {
            return "is geen geldige waarde";
        },
        'ContainsOnlyValidationRule': function (newValue, threshold) {
            return "is geen geldige waarde";
        },
        'StrongPasswordValidationRule': function (newValue, threshold) {
            return "moet een combinatie van letters, hoofdletters, cijfers en speciale tekens zijn";
        },
        'MediumPasswordValidationRule': function (newValue, threshold) {
            return "moet op zijn minst " + utilities_1.Utilities.getValue(threshold) + " van de volgende groepen bevatten: letters, hoofdletters, cijfers of speciale tekens";
        }
    }
};

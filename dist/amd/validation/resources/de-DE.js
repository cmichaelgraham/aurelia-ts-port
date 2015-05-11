define(["require", "exports", '../validation/utilities'], function (require, exports, utilities_1) {
    exports.data = {
        settings: {
            'numericRegex': /^-?(?:\d+)(?:\,\d+)?$/
        },
        messages: {
            'isRequired': 'wird benötigt',
            'onValidateCallback': 'ist kein gültiger Wert',
            'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                return "darf nur alphanumerische Zeichen oder Leerzeichen beinhalten";
            },
            'AlphaNumericValidationRule': function (newValue, threshold) {
                return "darf nur alphanumerische Zeichen beinhalten";
            },
            'BetweenLengthValidationRule': function (newValue, threshold) {
                return "muss zwischen " + utilities_1.Utilities.getValue(threshold.minimumLength) + " und " + utilities_1.Utilities.getValue(threshold.maximumLength) + " Zeichen lang sein";
            },
            'BetweenValueValidationRule': function (newValue, threshold) {
                return "muss zwischen " + utilities_1.Utilities.getValue(threshold.minimumValue) + " und " + utilities_1.Utilities.getValue(threshold.maximumValue) + " sein";
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
                return "sollte " + utilities_1.Utilities.getValue(threshold.otherValue) + " sein";
            },
            'InEqualityValidationRule': function (newValue, threshold) {
                return "sollte nicht " + utilities_1.Utilities.getValue(threshold.otherValue) + " sein";
            },
            'EqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                return "darf nicht mit " + utilities_1.Utilities.getValue(threshold.otherValueLabel) + " \u00FCbereinstimmen";
            },
            'InEqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                return "cannot not match " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
            },
            'InCollectionValidationRule': function (newValue, threshold) {
                return "ist kein g\u00FCltiger Wert";
            },
            'MinimumLengthValidationRule': function (newValue, threshold) {
                return "muss mindestens " + utilities_1.Utilities.getValue(threshold) + " Zeichen lang sein";
            },
            'MinimumValueValidationRule': function (newValue, threshold) {
                return "sollte " + utilities_1.Utilities.getValue(threshold) + " oder mehr sein";
            },
            'MaximumLengthValidationRule': function (newValue, threshold) {
                return "darf nicht l\u00E4nger als " + utilities_1.Utilities.getValue(threshold) + " Zeichen sein";
            },
            'MaximumValueValidationRule': function (newValue, threshold) {
                return "muss geringer als " + utilities_1.Utilities.getValue(threshold) + " sein";
            },
            'NumericValidationRule': function (newValue, threshold) {
                return "muss eine Nummer sein";
            },
            'RegexValidationRule': function (newValue, threshold) {
                return "ist kein g\u00FCltiger Wert";
            },
            'ContainsOnlyValidationRule': function (newValue, threshold) {
                return "ist kein g\u00FCltiger Wert";
            },
            'StrongPasswordValidationRule': function (newValue, threshold) {
                return "sollte eine Kombination aus Gro\u00DF- und Kleinbuchstaben, sowie Zahlen und Sonderzeichen enthalten";
            },
            'MediumPasswordValidationRule': function (newValue, threshold) {
                return "sollte zumindest " + utilities_1.Utilities.getValue(threshold) + " der folgenden Gruppen enthalten: Kleinbuchstaben, Gro\u00DFbuchstaben, Zahlen oder Sonderzeichen";
            }
        }
    };
});

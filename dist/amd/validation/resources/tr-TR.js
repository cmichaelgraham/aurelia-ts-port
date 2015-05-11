define(["require", "exports", '../validation/utilities'], function (require, exports, utilities_1) {
    exports.data = {
        settings: {
            'numericRegex': /^-?(?:\d+)(?:\,\d+)?$/
        },
        messages: {
            'isRequired': 'gereklidir',
            'onValidateCallback': 'geçerli bir değer giriniz',
            'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
                return "sadece alfanumerik karakterler veya bo\u015Fluk girebilirsiniz";
            },
            'AlphaNumericValidationRule': function (newValue, threshold) {
                return "sadece alfanumerik karakterleri girebilirsiniz";
            },
            'AlphaValidationRule': function (newValue, threshold) {
                return "sadece harf veya bo\u015Fluk girebilirsiniz";
            },
            'AlphaOrWhitespaceValidationRule': function (newValue, threshold) {
                return "sadece harf veya bo\u015Fluk girebilirsiniz";
            },
            'BetweenLengthValidationRule': function (newValue, threshold) {
                return "uzunlu\u011Fu " + utilities_1.Utilities.getValue(threshold.minimumLength) + " ile " + utilities_1.Utilities.getValue(threshold.maximumLength) + " aras\u0131nda olmal\u0131d\u0131r";
            },
            'BetweenValueValidationRule': function (newValue, threshold) {
                return utilities_1.Utilities.getValue(threshold.minimumValue) + " ile " + utilities_1.Utilities.getValue(threshold.maximumValue) + " aras\u0131nda bir de\u011Fer giriniz";
            },
            'CustomFunctionValidationRule': function (newValue, threshold) {
                return "ge\u00E7erli bir de\u011Fer giriniz";
            },
            'DigitValidationRule': function (newValue, threshold) {
                return "sadece rakam girebilirsiniz";
            },
            'EmailValidationRule': function (newValue, threshold) {
                return "ge\u00E7erli bir e-posta giriniz";
            },
            'EqualityValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + utilities_1.Utilities.getValue(threshold.otherValue) + "''e e\u015Fit olmal\u0131d\u0131r";
            },
            'InEqualityValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + utilities_1.Utilities.getValue(threshold.otherValue) + "''den farkl\u0131 olmal\u0131d\u0131r";
            },
            'EqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + utilities_1.Utilities.getValue(threshold.otherValueLabel) + "''e e\u015Fit olmal\u0131d\u0131r";
            },
            'InEqualityWithOtherLabelValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + utilities_1.Utilities.getValue(threshold.otherValueLabel) + "''den farkl\u0131 olmal\u0131d\u0131r";
            },
            'InCollectionValidationRule': function (newValue, threshold) {
                return "ge\u00E7ersiz de\u011Fer";
            },
            'MinimumInclusiveValueValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + utilities_1.Utilities.getValue(threshold) + " veya daha fazla olmal\u0131d\u0131r";
            },
            'MinimumLengthValidationRule': function (newValue, threshold) {
                return "de\u011Fer en az " + utilities_1.Utilities.getValue(threshold) + " karakter uzunlu\u011Funda olmal\u0131d\u0131r";
            },
            'MinimumValueValidationRule': function (newValue, threshold) {
                return "daha fazla olmal\u0131d\u0131r " + utilities_1.Utilities.getValue(threshold);
            },
            'MaximumInclusiveValueValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + utilities_1.Utilities.getValue(threshold) + "''dan az olmal\u0131";
            },
            'MaximumLengthValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + utilities_1.Utilities.getValue(threshold) + " karakterden uzun olmamal\u0131d\u0131r";
            },
            'MaximumValueValidationRule': function (newValue, threshold) {
                return "de\u011Fer " + utilities_1.Utilities.getValue(threshold) + "''dan az olmal\u0131";
            },
            'NumericValidationRule': function (newValue, threshold) {
                return "sadece say\u0131 girebilirsiniz";
            },
            'RegexValidationRule': function (newValue, threshold) {
                return "ge\u00E7erli bir de\u011Fer giriniz";
            },
            'ContainsOnlyValidationRule': function (newValue, threshold) {
                return "ge\u00E7erli bir de\u011Fer giriniz";
            },
            'StrongPasswordValidationRule': function (newValue, threshold) {
                return "k\u00FC\u00E7\u00FCk harfler, b\u00FCy\u00FCk harfler, say\u0131lar ve i\u015Faretlerin birle\u015Fimi olmal\u0131d\u0131r";
            },
            'MediumPasswordValidationRule': function (newValue, threshold) {
                return "k\u00FC\u00E7\u00FCk harfler, b\u00FCy\u00FCk harfler, say\u0131lar veya i\u015Faretlerden en az " + utilities_1.Utilities.getValue(threshold) + " de\u011Fi\u015Fik tip olmal\u0131";
            }
        }
    };
});

var utilities_1 = require('../validation/utilities');
exports.data = {
    settings: {
        'numericRegex': /^-?(?:\d+)(?:\,\d+)?$/
    },
    messages: {
        'isRequired': 'es obligatorio',
        'onValidateCallback': 'no es un valor valido',
        'AlphaNumericOrWhitespaceValidationRule': function (newValue, threshold) {
            return "solo puede contener caracteres alfanum\u00E9ricos y espacios";
        },
        'AlphaNumericValidationRule': function (newValue, threshold) {
            return "solo puede contener caracteres alfanum\u00E9ricos";
        },
        'AlphaValidationRule': function (newValue, threshold) {
            return "solo puede contener letras";
        },
        'AlphaOrWhitespaceValidationRule': function (newValue, threshold) {
            return "solo puede contener letras y espacios";
        },
        'BetweenLengthValidationRule': function (newValue, threshold) {
            return "debe ser entre " + utilities_1.Utilities.getValue(threshold.minimumLength) + " y " + utilities_1.Utilities.getValue(threshold.maximumLength) + " letras de largo";
        },
        'BetweenValueValidationRule': function (newValue, threshold) {
            return "debe tener un valor entre " + utilities_1.Utilities.getValue(threshold.minimumValue) + " y " + utilities_1.Utilities.getValue(threshold.maximumValue);
        },
        'CustomFunctionValidationRule': function (newValue, threshold) {
            return "es un valor invalido";
        },
        'DigitValidationRule': function (newValue, threshold) {
            return "solo puede contener numeros";
        },
        'EmailValidationRule': function (newValue, threshold) {
            return "no es un correo electr\u00F3nico valido";
        },
        'EqualityValidationRule': function (newValue, threshold) {
            return "debe ser " + utilities_1.Utilities.getValue(threshold.otherValue);
        },
        'InEqualityValidationRule': function (newValue, threshold) {
            return "no puede ser " + utilities_1.Utilities.getValue(threshold.otherValue);
        },
        'EqualityWithOtherLabelValidationRule': function (newValue, threshold) {
            return "no es igual a " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
        },
        'InEqualityWithOtherLabelValidationRule': function (newValue, threshold) {
            return "no puede ser igual a " + utilities_1.Utilities.getValue(threshold.otherValueLabel);
        },
        'InCollectionValidationRule': function (newValue, threshold) {
            return "no es un valor valido";
        },
        'MinimumInclusiveValueValidationRule': function (newValue, threshold) {
            return "debe ser " + utilities_1.Utilities.getValue(threshold) + " o mayor";
        },
        'MinimumLengthValidationRule': function (newValue, threshold) {
            return "debe ser almenos de " + utilities_1.Utilities.getValue(threshold) + " caracteres";
        },
        'MinimumValueValidationRule': function (newValue, threshold) {
            return "debe ser " + utilities_1.Utilities.getValue(threshold) + " o superior";
        },
        'MaximumInclusiveValueValidationRule': function (newValue, threshold) {
            return "debe ser " + utilities_1.Utilities.getValue(threshold) + " o menos";
        },
        'MaximumLengthValidationRule': function (newValue, threshold) {
            return "no puede medir m\u00E1s de " + utilities_1.Utilities.getValue(threshold) + " caracteres";
        },
        'MaximumValueValidationRule': function (newValue, threshold) {
            return "debe ser menor a " + utilities_1.Utilities.getValue(threshold);
        },
        'NumericValidationRule': function (newValue, threshold) {
            return "debe ser un numero";
        },
        'RegexValidationRule': function (newValue, threshold) {
            return "no es un valor valido";
        },
        'ContainsOnlyValidationRule': function (newValue, threshold) {
            return "no es un valor valido";
        },
        'StrongPasswordValidationRule': function (newValue, threshold) {
            return "debe contener una combinaci\u00F3n de letras min\u00FAsculas, may\u00FAsculas, d\u00EDgitos y caracteres especiales";
        },
        'MediumPasswordValidationRule': function (newValue, threshold) {
            return "debe poseer al menos " + utilities_1.Utilities.getValue(threshold) + " de las siguientes caracter\u00EDsticas: letras min\u00FAsculas, letras may\u00FAsculas, d\u00EDgitos o caracteres especiales";
        }
    }
};

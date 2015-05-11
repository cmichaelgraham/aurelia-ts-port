System.register(['./validation/utilities', './validation/validation-config', './validation/validation-locale', './validation/validation-result', './validation/validation-rules', './validation/validation', './validation/validate-custom-attribute', './validation/validate-custom-attribute-view-strategy', './validation/validate-custom-attribute-view-strategy', './validation/decorators', './validation/validation-config', './validation/validation'], function(exports_1) {
    var validation_config_1, validation_1;
    function configure(aurelia, configCallback) {
        aurelia.globalizeResources('./validation/validate-custom-attribute');
        if (configCallback !== undefined && typeof (configCallback) === 'function') {
            configCallback(validation_1.Validation.defaults);
        }
        aurelia.withSingleton(validation_config_1.ValidationConfig, validation_1.Validation.defaults);
        return validation_1.Validation.defaults.locale();
    }
    exports_1("configure", configure);
    var exportedNames_1 = {
        'configure': true,
        'Utilities': true,
        'ValidationConfig': true,
        'ValidationLocale': true,
        'Validation': true,
        'ValidateCustomAttribute': true,
        'ValidateCustomAttributeViewStrategy': true,
        'ValidateCustomAttributeViewStrategyBase': true,
        'ensure': true
    };
    function exportStar_1(m) {
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports_1(n, m[n]);
        }
    }
    return {
        setters:[
            function (_utilities_1) {
                exports_1("Utilities", _utilities_1["Utilities"]);
            },
            function (_validation_config_2) {
                exports_1("ValidationConfig", _validation_config_2["ValidationConfig"]);
            },
            function (_validation_locale_1) {
                exports_1("ValidationLocale", _validation_locale_1["ValidationLocale"]);
            },
            function (_validation_result_1) {
                exportStar_1(_validation_result_1);
            },
            function (_validation_rules_1) {
                exportStar_1(_validation_rules_1);
            },
            function (_validation_2) {
                exports_1("Validation", _validation_2["Validation"]);
            },
            function (_validate_custom_attribute_1) {
                exports_1("ValidateCustomAttribute", _validate_custom_attribute_1["ValidateCustomAttribute"]);
            },
            function (_validate_custom_attribute_view_strategy_1) {
                exports_1("ValidateCustomAttributeViewStrategy", _validate_custom_attribute_view_strategy_1["ValidateCustomAttributeViewStrategy"]);
            },
            function (_validate_custom_attribute_view_strategy_2) {
                exports_1("ValidateCustomAttributeViewStrategyBase", _validate_custom_attribute_view_strategy_2["ValidateCustomAttributeViewStrategyBase"]);
            },
            function (_decorators_1) {
                exports_1("ensure", _decorators_1["ensure"]);
            },
            function (_validation_config_1) {
                validation_config_1 = _validation_config_1;
            },
            function (_validation_1) {
                validation_1 = _validation_1;
            }],
        execute: function() {
        }
    }
});

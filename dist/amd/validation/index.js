define(["require", "exports", './validation/utilities', './validation/validation-config', './validation/validation-locale', './validation/validation-result', './validation/validation-rules', './validation/validation', './validation/validate-custom-attribute', './validation/validate-custom-attribute-view-strategy', './validation/validate-custom-attribute-view-strategy', './validation/decorators', './validation/validation-config', './validation/validation'], function (require, exports, utilities_1, validation_config_1, validation_locale_1, validation_result_1, validation_rules_1, validation_1, validate_custom_attribute_1, validate_custom_attribute_view_strategy_1, validate_custom_attribute_view_strategy_2, decorators_1, validation_config_2, validation_2) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.Utilities = utilities_1.Utilities;
    exports.ValidationConfig = validation_config_1.ValidationConfig;
    exports.ValidationLocale = validation_locale_1.ValidationLocale;
    __export(validation_result_1);
    __export(validation_rules_1);
    exports.Validation = validation_1.Validation;
    exports.ValidateCustomAttribute = validate_custom_attribute_1.ValidateCustomAttribute;
    exports.ValidateCustomAttributeViewStrategy = validate_custom_attribute_view_strategy_1.ValidateCustomAttributeViewStrategy;
    exports.ValidateCustomAttributeViewStrategyBase = validate_custom_attribute_view_strategy_2.ValidateCustomAttributeViewStrategyBase;
    exports.ensure = decorators_1.ensure;
    function configure(aurelia, configCallback) {
        aurelia.globalizeResources('./validation/validate-custom-attribute');
        if (configCallback !== undefined && typeof (configCallback) === 'function') {
            configCallback(validation_2.Validation.defaults);
        }
        aurelia.withSingleton(validation_config_2.ValidationConfig, validation_2.Validation.defaults);
        return validation_2.Validation.defaults.locale();
    }
    exports.configure = configure;
});

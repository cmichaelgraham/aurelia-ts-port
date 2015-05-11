function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var utilities_1 = require('./validation/utilities');
exports.Utilities = utilities_1.Utilities;
var validation_config_1 = require('./validation/validation-config');
exports.ValidationConfig = validation_config_1.ValidationConfig;
var validation_locale_1 = require('./validation/validation-locale');
exports.ValidationLocale = validation_locale_1.ValidationLocale;
__export(require('./validation/validation-result'));
__export(require('./validation/validation-rules'));
var validation_1 = require('./validation/validation');
exports.Validation = validation_1.Validation;
var validate_custom_attribute_1 = require('./validation/validate-custom-attribute');
exports.ValidateCustomAttribute = validate_custom_attribute_1.ValidateCustomAttribute;
var validate_custom_attribute_view_strategy_1 = require('./validation/validate-custom-attribute-view-strategy');
exports.ValidateCustomAttributeViewStrategy = validate_custom_attribute_view_strategy_1.ValidateCustomAttributeViewStrategy;
var validate_custom_attribute_view_strategy_2 = require('./validation/validate-custom-attribute-view-strategy');
exports.ValidateCustomAttributeViewStrategyBase = validate_custom_attribute_view_strategy_2.ValidateCustomAttributeViewStrategyBase;
var decorators_1 = require('./validation/decorators');
exports.ensure = decorators_1.ensure;
var validation_config_2 = require('./validation/validation-config');
var validation_2 = require('./validation/validation');
function configure(aurelia, configCallback) {
    aurelia.globalizeResources('./validation/validate-custom-attribute');
    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        configCallback(validation_2.Validation.defaults);
    }
    aurelia.withSingleton(validation_config_2.ValidationConfig, validation_2.Validation.defaults);
    return validation_2.Validation.defaults.locale();
}
exports.configure = configure;

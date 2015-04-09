var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", './validation/validation-locale-repository', './validation/validation-result', './validation/validation-rules', './validation/validation-rules-collection', './validation/validation-group-builder', './validation/validation', './validation/validate-attached-behavior', './validation/validate-attached-behavior-config', './validation/debouncer'], function (require, exports, validation_locale_repository_1, validation_result_1, validation_rules_1, validation_rules_collection_1, validation_group_builder_1, validation_1, validate_attached_behavior_1, validate_attached_behavior_config_1, debouncer_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(validation_locale_repository_1);
    __export(validation_result_1);
    __export(validation_rules_1);
    __export(validation_rules_collection_1);
    __export(validation_group_builder_1);
    __export(validation_1);
    __export(validate_attached_behavior_1);
    __export(validate_attached_behavior_config_1);
    __export(debouncer_1);
    function install(aurelia) {
        aurelia.globalizeResources('./validation/validate-attached-behavior');
    }
    exports.install = install;
});

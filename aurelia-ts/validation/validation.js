define(["require", "exports", './validation/validation-locale-repository', './validation/validation-result', './validation/validation-rules', './validation/validation-rules-collection', './validation/validation-group-builder', './validation/validation', './validation/validate-attached-behavior', './validation/validate-attached-behavior-config'], function (require, exports, _validation_locale_repository, _validation_result, _validation_rules, _validation_rules_collection, _validation_group_builder, _validation, _validate_attached_behavior, _validate_attached_behavior_config) {
    for (var _a in _validation_locale_repository) if (!exports.hasOwnProperty(_a)) exports[_a] = _validation_locale_repository[_a];
    for (var _b in _validation_result) if (!exports.hasOwnProperty(_b)) exports[_b] = _validation_result[_b];
    for (var _c in _validation_rules) if (!exports.hasOwnProperty(_c)) exports[_c] = _validation_rules[_c];
    for (var _d in _validation_rules_collection) if (!exports.hasOwnProperty(_d)) exports[_d] = _validation_rules_collection[_d];
    for (var _e in _validation_group_builder) if (!exports.hasOwnProperty(_e)) exports[_e] = _validation_group_builder[_e];
    for (var _f in _validation) if (!exports.hasOwnProperty(_f)) exports[_f] = _validation[_f];
    for (var _g in _validate_attached_behavior) if (!exports.hasOwnProperty(_g)) exports[_g] = _validate_attached_behavior[_g];
    for (var _h in _validate_attached_behavior_config) if (!exports.hasOwnProperty(_h)) exports[_h] = _validate_attached_behavior_config[_h];
    function install(aurelia) {
        aurelia.globalizeResources('./validation/validate-attached-behavior');
    }
    exports.install = install;
});

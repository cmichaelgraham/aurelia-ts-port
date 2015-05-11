define(["require", "exports", '../validation/validation-locale', '../validation/validate-custom-attribute-view-strategy'], function (require, exports, validation_locale_1, validate_custom_attribute_view_strategy_1) {
    var ValidationConfigDefaults = (function () {
        function ValidationConfigDefaults() {
        }
        return ValidationConfigDefaults;
    })();
    exports.ValidationConfigDefaults = ValidationConfigDefaults;
    ValidationConfigDefaults._defaults = {
        debounceTimeout: 0,
        dependencies: [],
        locale: 'en-US',
        localeResources: 'aurelia-validation/resources/',
        viewStrategy: validate_custom_attribute_view_strategy_1.ValidateCustomAttributeViewStrategy.TWBootstrapAppendToMessage
    };
    ValidationConfigDefaults.defaults = function () {
        var defaults = {};
        Object.assign(defaults, ValidationConfigDefaults._defaults);
        return defaults;
    };
    var ValidationConfig = (function () {
        function ValidationConfig(innerConfig) {
            this.innerConfig = innerConfig;
            this.values = this.innerConfig ? {} : ValidationConfigDefaults.defaults();
            this.changedHandlers = new Map();
        }
        ValidationConfig.prototype.getValue = function (identifier) {
            if (this.values.hasOwnProperty(identifier) !== null && this.values[identifier] !== undefined) {
                return this.values[identifier];
            }
            if (this.innerConfig !== null) {
                return this.innerConfig.getValue(identifier);
            }
            throw Error('Config not found: ' + identifier);
        };
        ValidationConfig.prototype.setValue = function (identifier, value) {
            this.values[identifier] = value;
            return this; //fluent API
        };
        ValidationConfig.prototype.onLocaleChanged = function (callback) {
            var _this = this;
            if (this.innerConfig !== undefined) {
                return this.innerConfig.onLocaleChanged(callback);
            }
            else {
                var id = ++ValidationConfig.uniqueListenerId;
                this.changedHandlers.set(id, callback);
                return function () {
                    _this.changedHandlers.delete(id);
                };
            }
        };
        ValidationConfig.prototype.getDebounceTimeout = function () {
            return this.getValue('debounceTimeout');
        };
        ValidationConfig.prototype.useDebounceTimeout = function (value) {
            return this.setValue('debounceTimeout', value);
        };
        ValidationConfig.prototype.getDependencies = function () {
            return this.getValue('dependencies');
        };
        ValidationConfig.prototype.computedFrom = function (dependencies) {
            var deps = dependencies;
            if (typeof (dependencies) === 'string') {
                deps = [];
                deps.push(dependencies);
            }
            return this.setValue('dependencies', deps);
        };
        ValidationConfig.prototype.useLocale = function (localeIdentifier) {
            this.setValue('locale', localeIdentifier);
            var callbacks = Array.from(this.changedHandlers.values());
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i]();
            }
            return this;
        };
        ValidationConfig.prototype.locale = function () {
            return validation_locale_1.ValidationLocale.Repository.load(this.getValue('locale'), this.getValue('localeResources'));
        };
        ValidationConfig.prototype.useViewStrategy = function (viewStrategy) {
            return this.setValue('viewStrategy', viewStrategy);
        };
        ValidationConfig.prototype.getViewStrategy = function () {
            return this.getValue('viewStrategy');
        };
        return ValidationConfig;
    })();
    exports.ValidationConfig = ValidationConfig;
    ValidationConfig.uniqueListenerId = 0;
});

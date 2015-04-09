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
define(["require", "exports", '../resources/defaults'], function (require, exports, defaults_1) {
    var ValidationLocaleRepository = (function () {
        function ValidationLocaleRepository() {
            this.defaults = new defaults_1.ValidationLocaleDefaults();
            this.currentLocale = null;
            this.currentLocaleIdentifier = null;
        }
        ValidationLocaleRepository.prototype.reset = function () {
            this.currentLocaleIdentifier = null;
            this.currentLocale = null;
        };
        ValidationLocaleRepository.prototype.load = function (lang) {
            var self = this;
            return new Promise(function (resolve, reject) {
                if (self.currentLocaleIdentifier === lang && self.currentLocale !== null) {
                    resolve(true);
                    return;
                }
                self.currentLocaleIdentifier = lang;
                System.import('./src/resources/' + self.currentLocaleIdentifier).then(function (resource) {
                    self.currentLocale = resource.data;
                    resolve(true);
                });
            });
        };
        ValidationLocaleRepository.prototype.getValueFor = function (identifier, category) {
            if (this.currentLocale && this.currentLocale[category]) {
                var currentLocaleSetting = this.currentLocale[category][identifier];
                if (currentLocaleSetting !== undefined && currentLocaleSetting !== null)
                    return currentLocaleSetting;
            }
            if (this.defaults[category]) {
                var defaultSetting = this.defaults[category][identifier];
                if (defaultSetting !== undefined && defaultSetting !== null)
                    return defaultSetting;
            }
            throw 'Could not find validation : ' + identifier + ' in category: ' + category;
        };
        ValidationLocaleRepository.prototype.setting = function (settingIdentifier) {
            return this.getValueFor(settingIdentifier, 'settings');
        };
        ValidationLocaleRepository.prototype.translate = function (translationIdentifier, newValue, threshold) {
            var translation = this.getValueFor(translationIdentifier, 'messages');
            if (typeof translation === 'function') {
                return translation(newValue, threshold);
            }
            if (typeof translation === 'string') {
                return translation;
            }
            throw 'Validation message for ' + translationIdentifier + 'was in an unsupported format';
        };
        return ValidationLocaleRepository;
    })();
    exports.ValidationLocaleRepository = ValidationLocaleRepository;
});

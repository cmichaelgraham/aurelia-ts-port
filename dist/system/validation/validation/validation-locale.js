System.register([], function(exports_1) {
    var ValidationLocale, ValidationLocaleRepository;
    return {
        setters:[],
        execute: function() {
            ValidationLocale = (function () {
                function ValidationLocale(defaults, data) {
                    this.defaults = defaults;
                    this.currentLocale = data;
                }
                ValidationLocale.prototype.getValueFor = function (identifier, category) {
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
                    throw 'validation: I18N: Could not find: ' + identifier + ' in category: ' + category;
                };
                ValidationLocale.prototype.setting = function (settingIdentifier) {
                    return this.getValueFor(settingIdentifier, 'settings');
                };
                ValidationLocale.prototype.translate = function (translationIdentifier, newValue, threshold) {
                    var translation = this.getValueFor(translationIdentifier, 'messages');
                    if (typeof translation === 'function') {
                        return translation(newValue, threshold);
                    }
                    if (typeof translation === 'string') {
                        return translation;
                    }
                    throw 'Validation message for ' + translationIdentifier + 'was in an unsupported format';
                };
                return ValidationLocale;
            })();
            exports_1("ValidationLocale", ValidationLocale);
            ValidationLocaleRepository = (function () {
                function ValidationLocaleRepository() {
                    this.default = null;
                    this.instances = new Map();
                    this.defaults = {
                        settings: {
                            'numericRegex': /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
                        },
                        messages: {}
                    };
                }
                ValidationLocaleRepository.prototype.load = function (localeIdentifier, basePath) {
                    var _this = this;
                    if (!basePath)
                        basePath = 'aurelia-validation/resources/';
                    return new Promise(function (resolve, reject) {
                        if (_this.instances.has(localeIdentifier)) {
                            var locale = _this.instances.get(localeIdentifier);
                            resolve(locale);
                        }
                        else {
                            Window.System.import(basePath + localeIdentifier).then(function (resource) {
                                var locale = _this.addLocale(localeIdentifier, resource.data);
                                resolve(locale);
                            });
                        }
                    });
                };
                ValidationLocaleRepository.prototype.addLocale = function (localeIdentifier, data) {
                    var instance = new ValidationLocale(this.defaults, data);
                    this.instances.set(localeIdentifier, instance);
                    if (this.default === null)
                        this.default = instance;
                    return instance;
                };
                return ValidationLocaleRepository;
            })();
            ValidationLocale.Repository = new ValidationLocaleRepository();
        }
    }
});

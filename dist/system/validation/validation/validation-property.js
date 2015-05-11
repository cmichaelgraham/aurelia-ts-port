System.register(['../validation/validation-rules-collection', '../validation/path-observer', '../validation/debouncer'], function(exports_1) {
    var AllCollections, path_observer_1, debouncer_1;
    var ValidationProperty;
    return {
        setters:[
            function (_AllCollections) {
                AllCollections = _AllCollections;
            },
            function (_path_observer_1) {
                path_observer_1 = _path_observer_1;
            },
            function (_debouncer_1) {
                debouncer_1 = _debouncer_1;
            }],
        execute: function() {
            ValidationProperty = (function () {
                function ValidationProperty(observerLocator, propertyName, validationGroup, propertyResult, config) {
                    var _this = this;
                    this.propertyResult = propertyResult;
                    this.propertyName = propertyName;
                    this.validationGroup = validationGroup;
                    this.collectionOfValidationRules = new AllCollections.ValidationRulesCollection();
                    this.config = config;
                    this.latestValue = undefined;
                    this.observer = new path_observer_1.PathObserver(observerLocator, validationGroup.subject, propertyName)
                        .getObserver();
                    this.debouncer = new debouncer_1.Debouncer(config.getDebounceTimeout());
                    this.observer.subscribe(function () {
                        _this.debouncer.debounce(function () {
                            var newValue = _this.observer.getValue();
                            if (newValue !== _this.latestValue) {
                                _this.validate(newValue, true);
                            }
                        });
                    });
                    this.dependencyObservers = [];
                    var dependencies = this.config.getDependencies();
                    for (var i = 0; i < dependencies.length; i++) {
                        var dependencyObserver = new path_observer_1.PathObserver(observerLocator, validationGroup.subject, dependencies[i])
                            .getObserver();
                        dependencyObserver.subscribe(function () {
                            _this.debouncer.debounce(function () {
                                _this.validateCurrentValue(true);
                            });
                        });
                        this.dependencyObservers.push(dependencyObserver);
                    }
                }
                ValidationProperty.prototype.addValidationRule = function (validationRule) {
                    if (validationRule.validate === undefined)
                        throw new Error("That's not a valid validationRule");
                    this.collectionOfValidationRules.addValidationRule(validationRule);
                    this.validateCurrentValue(false);
                };
                ValidationProperty.prototype.validateCurrentValue = function (forceDirty, forceExecution) {
                    return this.validate(this.observer.getValue(), forceDirty, forceExecution);
                };
                ValidationProperty.prototype.clear = function () {
                    this.latestValue = this.observer.getValue();
                    this.propertyResult.clear();
                };
                /**
                 * returns a promise that fulfils and resolves to true/false
                 */
                ValidationProperty.prototype.validate = function (newValue, shouldBeDirty, forceExecution) {
                    var _this = this;
                    if ((!this.propertyResult.isDirty && shouldBeDirty) || this.latestValue !== newValue || forceExecution) {
                        this.latestValue = newValue;
                        return this.config.locale().then(function (locale) {
                            return _this.collectionOfValidationRules.validate(newValue, locale)
                                .then(function (validationResponse) {
                                if (_this.latestValue === validationResponse.latestValue)
                                    _this.propertyResult.setValidity(validationResponse, shouldBeDirty);
                                return validationResponse.isValid;
                            })
                                .catch(function (err) {
                                console.log("Unexpected behavior: a validation-rules-collection should always fulfil", err);
                                debugger;
                                throw Error("Unexpected behavior: a validation-rules-collection should always fulfil");
                            });
                        }, function () {
                            throw Error("An exception occurred while trying to load the locale");
                        });
                    }
                };
                return ValidationProperty;
            })();
            exports_1("ValidationProperty", ValidationProperty);
        }
    }
});

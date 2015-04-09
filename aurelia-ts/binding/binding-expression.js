var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", './binding-modes'], function (require, exports, binding_modes_1) {
    var BindingExpression = (function () {
        function BindingExpression(observerLocator, targetProperty, sourceExpression, mode, valueConverterLookupFunction, attribute) {
            this.observerLocator = observerLocator;
            this.targetProperty = targetProperty;
            this.sourceExpression = sourceExpression;
            this.mode = mode;
            this.valueConverterLookupFunction = valueConverterLookupFunction;
            this.attribute = attribute;
            this.discrete = false;
        }
        BindingExpression.prototype.createBinding = function (target) {
            return new Binding(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.mode, this.valueConverterLookupFunction);
        };
        return BindingExpression;
    })();
    exports.BindingExpression = BindingExpression;
    var Binding = (function () {
        function Binding(observerLocator, sourceExpression, target, targetProperty, mode, valueConverterLookupFunction) {
            this.observerLocator = observerLocator;
            this.sourceExpression = sourceExpression;
            this.targetProperty = observerLocator.getObserver(target, targetProperty);
            this.mode = mode;
            this.valueConverterLookupFunction = valueConverterLookupFunction;
        }
        Binding.prototype.getObserver = function (obj, propertyName) {
            return this.observerLocator.getObserver(obj, propertyName);
        };
        Binding.prototype.bind = function (source) {
            var _this = this;
            var targetProperty = this.targetProperty, info;
            if ('bind' in targetProperty) {
                targetProperty.bind();
            }
            if (this.mode == binding_modes_1.ONE_WAY || this.mode == binding_modes_1.TWO_WAY) {
                if (this._disposeObserver) {
                    if (this.source === source) {
                        return;
                    }
                    this.unbind();
                }
                info = this.sourceExpression.connect(this, source);
                if (info.observer) {
                    this._disposeObserver = info.observer.subscribe(function (newValue) {
                        var existing = targetProperty.getValue();
                        if (newValue !== existing) {
                            targetProperty.setValue(newValue);
                        }
                    });
                }
                if (info.value !== undefined) {
                    targetProperty.setValue(info.value);
                }
                if (this.mode == binding_modes_1.TWO_WAY) {
                    this._disposeListener = targetProperty.subscribe(function (newValue) {
                        _this.sourceExpression.assign(source, newValue, _this.valueConverterLookupFunction);
                    });
                }
                this.source = source;
            }
            else {
                var value = this.sourceExpression.evaluate(source, this.valueConverterLookupFunction);
                if (value !== undefined) {
                    targetProperty.setValue(value);
                }
            }
        };
        Binding.prototype.unbind = function () {
            if ('unbind' in this.targetProperty) {
                this.targetProperty.unbind();
            }
            if (this._disposeObserver) {
                this._disposeObserver();
                this._disposeObserver = null;
            }
            if (this._disposeListener) {
                this._disposeListener();
                this._disposeListener = null;
            }
        };
        return Binding;
    })();
});

var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports"], function (require, exports) {
    var CallExpression = (function () {
        function CallExpression(observerLocator, targetProperty, sourceExpression, valueConverterLookupFunction) {
            this.observerLocator = observerLocator;
            this.targetProperty = targetProperty;
            this.sourceExpression = sourceExpression;
            this.valueConverterLookupFunction = valueConverterLookupFunction;
        }
        CallExpression.prototype.createBinding = function (target) {
            return new Call(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.valueConverterLookupFunction);
        };
        return CallExpression;
    })();
    exports.CallExpression = CallExpression;
    var Call = (function () {
        function Call(observerLocator, sourceExpression, target, targetProperty, valueConverterLookupFunction) {
            this.sourceExpression = sourceExpression;
            this.target = target;
            this.targetProperty = observerLocator.getObserver(target, targetProperty);
            this.valueConverterLookupFunction = valueConverterLookupFunction;
        }
        Call.prototype.bind = function (source) {
            var _this = this;
            if (this.source === source) {
                return;
            }
            if (this.source) {
                this.unbind();
            }
            this.source = source;
            this.targetProperty.setValue(function () {
                var rest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest[_i - 0] = arguments[_i];
                }
                return _this.sourceExpression.evaluate(source, _this.valueConverterLookupFunction, rest);
            });
        };
        Call.prototype.unbind = function () {
            this.targetProperty.setValue(null);
        };
        return Call;
    })();
});

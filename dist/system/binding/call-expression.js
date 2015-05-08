System.register([], function(exports_1) {
    var CallExpression, Call;
    return {
        setters:[],
        execute: function() {
            CallExpression = (function () {
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
            exports_1("CallExpression", CallExpression);
            Call = (function () {
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
                    this.targetProperty.setValue(function ($event) {
                        var result, temp = source.$event;
                        source.$event = $event;
                        result = _this.sourceExpression.evaluate(source, _this.valueConverterLookupFunction);
                        source.$event = temp;
                        return result;
                    });
                };
                Call.prototype.unbind = function () {
                    this.targetProperty.setValue(null);
                };
                return Call;
            })();
        }
    }
});

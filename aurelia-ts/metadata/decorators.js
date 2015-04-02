define(["require", "exports", './decorator-applicator'], function (require, exports, _decorator_applicator) {
    exports.Decorators = {
        metadata: function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i - 0] = arguments[_i];
            }
            var applicator = new _decorator_applicator.DecoratorApplicator();
            return applicator.metadata.apply(applicator, rest);
        },
        configure: {
            parameterizedDecorator: function (name, decorator) {
                exports.Decorators[name] = function () {
                    var applicator = new _decorator_applicator.DecoratorApplicator();
                    return applicator[name].apply(applicator, arguments);
                };
                _decorator_applicator.DecoratorApplicator.prototype[name] = function () {
                    var result = decorator.apply(null, arguments);
                    return this.decorator(result);
                };
            },
            simpleDecorator: function (name, decorator) {
                exports.Decorators[name] = function () {
                    return new _decorator_applicator.DecoratorApplicator().decorator(decorator);
                };
                _decorator_applicator.DecoratorApplicator.prototype[name] = function () {
                    return this.decorator(decorator);
                };
            }
        }
    };
});

define(["require", "exports", './decorator-applicator'], function (require, exports, decorator_applicator_1) {
    exports.Decorators = {
        metadata: function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i - 0] = arguments[_i];
            }
            var applicator = new decorator_applicator_1.DecoratorApplicator();
            return applicator.metadata.apply(applicator, rest);
        },
        configure: {
            parameterizedDecorator: function (name, decorator) {
                exports.Decorators[name] = function () {
                    var applicator = new decorator_applicator_1.DecoratorApplicator();
                    return applicator[name].apply(applicator, arguments);
                };
                decorator_applicator_1.DecoratorApplicator.prototype[name] = function () {
                    var result = decorator.apply(null, arguments);
                    return this.decorator(result);
                };
            },
            simpleDecorator: function (name, decorator) {
                exports.Decorators[name] = function () {
                    return new decorator_applicator_1.DecoratorApplicator().decorator(decorator);
                };
                decorator_applicator_1.DecoratorApplicator.prototype[name] = function () {
                    return this.decorator(decorator);
                };
            }
        }
    };
});

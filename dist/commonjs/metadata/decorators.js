var decorator_applicator_1 = require('./decorator-applicator');
exports.Decorators = {
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

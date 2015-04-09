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
define(["require", "exports", './decorator-applicator'], function (require, exports, decorator_applicator_1) {
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
});

var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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

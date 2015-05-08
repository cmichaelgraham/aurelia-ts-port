System.register(['./decorator-applicator'], function(exports_1) {
    var decorator_applicator_1;
    var Decorators;
    return {
        setters:[
            function (_decorator_applicator_1) {
                decorator_applicator_1 = _decorator_applicator_1;
            }],
        execute: function() {
            exports_1("Decorators", Decorators = {
                configure: {
                    parameterizedDecorator: function (name, decorator) {
                        Decorators[name] = function () {
                            var applicator = new decorator_applicator_1.DecoratorApplicator();
                            return applicator[name].apply(applicator, arguments);
                        };
                        decorator_applicator_1.DecoratorApplicator.prototype[name] = function () {
                            var result = decorator.apply(null, arguments);
                            return this.decorator(result);
                        };
                    },
                    simpleDecorator: function (name, decorator) {
                        Decorators[name] = function () {
                            return new decorator_applicator_1.DecoratorApplicator().decorator(decorator);
                        };
                        decorator_applicator_1.DecoratorApplicator.prototype[name] = function () {
                            return this.decorator(decorator);
                        };
                    }
                }
            });
        }
    }
});

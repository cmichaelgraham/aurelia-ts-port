define(["require", "exports", 'aurelia-metadata', './metadata', './metadata', './container'], function (require, exports, aurelia_metadata_1, metadata_1, metadata_2, container_1) {
    exports.TransientRegistration = metadata_2.TransientRegistration;
    exports.SingletonRegistration = metadata_2.SingletonRegistration;
    exports.Resolver = metadata_2.Resolver;
    exports.Lazy = metadata_2.Lazy;
    exports.All = metadata_2.All;
    exports.Optional = metadata_2.Optional;
    exports.Parent = metadata_2.Parent;
    exports.FactoryActivator = metadata_2.FactoryActivator;
    exports.Container = container_1.Container;
    function inject() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
        return function (target) {
            target.inject = rest;
        };
    }
    exports.inject = inject;
    function transient(key) {
        return function (target) {
            aurelia_metadata_1.Metadata.on(target).add(new metadata_1.TransientRegistration(key));
        };
    }
    exports.transient = transient;
    function singleton(keyOrRegisterInChild, registerInChild) {
        if (registerInChild === void 0) { registerInChild = false; }
        return function (target) {
            aurelia_metadata_1.Metadata.on(target).add(new metadata_1.SingletonRegistration(keyOrRegisterInChild, registerInChild));
        };
    }
    exports.singleton = singleton;
    function factory(target) {
        aurelia_metadata_1.Metadata.on(target).add(new metadata_1.FactoryActivator());
    }
    exports.factory = factory;
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('inject', inject);
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('transient', transient);
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('singleton', singleton);
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('factory', factory);
});

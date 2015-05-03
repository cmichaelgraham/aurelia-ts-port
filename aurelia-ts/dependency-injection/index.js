define(["require", "exports", 'aurelia-metadata', './metadata', './container', './metadata', './container'], function (require, exports, aurelia_metadata_1, metadata_1, container_1, metadata_2, container_2) {
    exports.TransientRegistration = metadata_2.TransientRegistration;
    exports.SingletonRegistration = metadata_2.SingletonRegistration;
    exports.Resolver = metadata_2.Resolver;
    exports.Lazy = metadata_2.Lazy;
    exports.All = metadata_2.All;
    exports.Optional = metadata_2.Optional;
    exports.Parent = metadata_2.Parent;
    exports.ClassActivator = metadata_2.ClassActivator;
    exports.FactoryActivator = metadata_2.FactoryActivator;
    exports.Container = container_2.Container;
    function autoinject(target) {
        var deco = function (target) {
            target.inject = Reflect.getOwnMetadata(aurelia_metadata_1.Metadata.paramTypes, target) || container_1.emptyParameters;
        };
        return target ? deco(target) : deco;
    }
    exports.autoinject = autoinject;
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
    function registration(value) {
        return function (target) {
            Reflect.defineMetadata(aurelia_metadata_1.Metadata.registration, value, target);
        };
    }
    exports.registration = registration;
    function transient(key) {
        return registration(new metadata_1.TransientRegistration(key));
    }
    exports.transient = transient;
    function singleton(keyOrRegisterInChild, registerInChild) {
        if (registerInChild === void 0) { registerInChild = false; }
        return registration(new metadata_1.SingletonRegistration(keyOrRegisterInChild, registerInChild));
    }
    exports.singleton = singleton;
    function instanceActivator(value) {
        return function (target) {
            Reflect.defineMetadata(aurelia_metadata_1.Metadata.instanceActivator, value, target);
        };
    }
    exports.instanceActivator = instanceActivator;
    function factory() {
        return instanceActivator(metadata_1.FactoryActivator.instance);
    }
    exports.factory = factory;
    aurelia_metadata_1.Decorators.configure.simpleDecorator('autoinject', autoinject);
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('inject', inject);
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('registration', registration);
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('transient', transient);
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('singleton', singleton);
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('instanceActivator', instanceActivator);
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('factory', factory);
});

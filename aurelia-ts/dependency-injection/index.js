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
define(["require", "exports", '../metadata/index', './metadata', './metadata', './container'], function (require, exports, index_1, metadata_1, metadata_2, container_1) {
    exports.Registration = metadata_2.Registration;
    exports.TransientRegistration = metadata_2.TransientRegistration;
    exports.SingletonRegistration = metadata_2.SingletonRegistration;
    exports.Resolver = metadata_2.Resolver;
    exports.Lazy = metadata_2.Lazy;
    exports.All = metadata_2.All;
    exports.Optional = metadata_2.Optional;
    exports.Parent = metadata_2.Parent;
    exports.InstanceActivator = metadata_2.InstanceActivator;
    exports.FactoryActivator = metadata_2.FactoryActivator;
    exports.Container = container_1.Container;
    function inject() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
        return function (target) {
            target.inject = rest;
            return target;
        };
    }
    exports.inject = inject;
    function transient(key) {
        return function (target) {
            index_1.Metadata.on(target).add(new metadata_1.TransientRegistration(key));
            return target;
        };
    }
    exports.transient = transient;
    function singleton(keyOrRegisterInChild, registerInChild) {
        if (registerInChild === void 0) { registerInChild = false; }
        return function (target) {
            index_1.Metadata.on(target).add(new metadata_1.SingletonRegistration(keyOrRegisterInChild, registerInChild));
            return target;
        };
    }
    exports.singleton = singleton;
    function factory(target) {
        index_1.Metadata.on(target).add(new metadata_1.FactoryActivator());
        return target;
    }
    exports.factory = factory;
    index_1.Decorators.configure.parameterizedDecorator('inject', inject);
    index_1.Decorators.configure.parameterizedDecorator('transient', transient);
    index_1.Decorators.configure.parameterizedDecorator('singleton', singleton);
    index_1.Decorators.configure.parameterizedDecorator('factory', factory);
});

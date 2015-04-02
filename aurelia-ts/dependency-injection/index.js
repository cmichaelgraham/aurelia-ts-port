define(["require", "exports", '../metadata/index', './metadata', './metadata', './container'], function (require, exports, _index, _metadata, _metadata_1, _container) {
    exports.Registration = _metadata_1.Registration;
    exports.TransientRegistration = _metadata_1.TransientRegistration;
    exports.SingletonRegistration = _metadata_1.SingletonRegistration;
    exports.Resolver = _metadata_1.Resolver;
    exports.Lazy = _metadata_1.Lazy;
    exports.All = _metadata_1.All;
    exports.Optional = _metadata_1.Optional;
    exports.Parent = _metadata_1.Parent;
    exports.Factory = _metadata_1.Factory;
    exports.Container = _container.Container;
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
            _index.Metadata.on(target).add(new _metadata.TransientRegistration(key));
            return target;
        };
    }
    exports.transient = transient;
    function singleton(keyOrRegisterInChild, registerInChild) {
        if (registerInChild === void 0) { registerInChild = false; }
        return function (target) {
            _index.Metadata.on(target).add(new _metadata.SingletonRegistration(keyOrRegisterInChild, registerInChild));
            return target;
        };
    }
    exports.singleton = singleton;
    _index.Decorators.configure.parameterizedDecorator('inject', inject);
    _index.Decorators.configure.parameterizedDecorator('transient', transient);
    _index.Decorators.configure.parameterizedDecorator('singleton', singleton);
});

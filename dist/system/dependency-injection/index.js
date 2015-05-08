System.register(['aurelia-metadata', './metadata', './container', './metadata', './container'], function(exports_1) {
    var aurelia_metadata_1, metadata_1, container_1;
    function autoinject(target) {
        var deco = function (target) {
            target.inject = Reflect.getOwnMetadata(aurelia_metadata_1.Metadata.paramTypes, target) || container_1.emptyParameters;
        };
        return (target ? deco(target) : deco);
    }
    exports_1("autoinject", autoinject);
    function inject() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
        return function (target) {
            target.inject = rest;
        };
    }
    exports_1("inject", inject);
    function registration(value) {
        return function (target) {
            Reflect.defineMetadata(aurelia_metadata_1.Metadata.registration, value, target);
        };
    }
    exports_1("registration", registration);
    function transient(key) {
        return registration(new metadata_1.TransientRegistration(key));
    }
    exports_1("transient", transient);
    function singleton(keyOrRegisterInChild, registerInChild) {
        if (registerInChild === void 0) { registerInChild = false; }
        return registration(new metadata_1.SingletonRegistration(keyOrRegisterInChild, registerInChild));
    }
    exports_1("singleton", singleton);
    function instanceActivator(value) {
        return function (target) {
            Reflect.defineMetadata(aurelia_metadata_1.Metadata.instanceActivator, value, target);
        };
    }
    exports_1("instanceActivator", instanceActivator);
    function factory() {
        return instanceActivator(metadata_1.FactoryActivator.instance);
    }
    exports_1("factory", factory);
    return {
        setters:[
            function (_aurelia_metadata_1) {
                aurelia_metadata_1 = _aurelia_metadata_1;
            },
            function (_metadata_1) {
                metadata_1 = _metadata_1;
            },
            function (_container_1) {
                container_1 = _container_1;
            },
            function (_metadata_2) {
                exports_1("TransientRegistration", _metadata_2["TransientRegistration"]);
                exports_1("SingletonRegistration", _metadata_2["SingletonRegistration"]);
                exports_1("Resolver", _metadata_2["Resolver"]);
                exports_1("Lazy", _metadata_2["Lazy"]);
                exports_1("All", _metadata_2["All"]);
                exports_1("Optional", _metadata_2["Optional"]);
                exports_1("Parent", _metadata_2["Parent"]);
                exports_1("ClassActivator", _metadata_2["ClassActivator"]);
                exports_1("FactoryActivator", _metadata_2["FactoryActivator"]);
            },
            function (_container_2) {
                exports_1("Container", _container_2["Container"]);
            }],
        execute: function() {
            aurelia_metadata_1.Decorators.configure.simpleDecorator('autoinject', autoinject);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('inject', inject);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('registration', registration);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('transient', transient);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('singleton', singleton);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('instanceActivator', instanceActivator);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('factory', factory);
        }
    }
});

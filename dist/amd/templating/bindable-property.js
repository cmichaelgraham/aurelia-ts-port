define(["require", "exports", './util', 'aurelia-binding'], function (require, exports, util_1, aurelia_binding_1) {
    function getObserver(behavior, instance, name) {
        var lookup = instance.__observers__;
        if (lookup === undefined) {
            lookup = behavior.observerLocator.getObserversLookup(instance);
            behavior.ensurePropertiesDefined(instance, lookup);
        }
        return lookup[name];
    }
    var BindableProperty = (function () {
        function BindableProperty(nameOrConfig) {
            if (typeof nameOrConfig === 'string') {
                this.name = nameOrConfig;
            }
            else {
                Object.assign(this, nameOrConfig);
            }
            this.attribute = this.attribute || util_1.hyphenate(this.name);
            this.defaultBindingMode = this.defaultBindingMode || aurelia_binding_1.bindingMode.oneWay;
            this.changeHandler = this.changeHandler || null;
            this.owner = null;
        }
        BindableProperty.prototype.registerWith = function (target, behavior, descriptor) {
            behavior.properties.push(this);
            behavior.attributes[this.attribute] = this;
            this.owner = behavior;
            if (descriptor) {
                this.descriptor = descriptor;
                return this.configureDescriptor(behavior, descriptor);
            }
        };
        BindableProperty.prototype.configureDescriptor = function (behavior, descriptor) {
            var name = this.name;
            descriptor.configurable = true;
            descriptor.enumerable = true;
            if ('initializer' in descriptor) {
                this.defaultValue = descriptor.initializer;
                delete descriptor.initializer;
                delete descriptor.writable;
            }
            if ('value' in descriptor) {
                this.defaultValue = descriptor.value;
                delete descriptor.value;
                delete descriptor.writable;
            }
            descriptor.get = function () {
                return getObserver(behavior, this, name).getValue();
            };
            descriptor.set = function (value) {
                getObserver(behavior, this, name).setValue(value);
            };
            return descriptor;
        };
        BindableProperty.prototype.defineOn = function (target, behavior) {
            var name = this.name, handlerName;
            if (this.changeHandler === null) {
                handlerName = name + 'Changed';
                if (handlerName in target.prototype) {
                    this.changeHandler = handlerName;
                }
            }
            if (!this.descriptor) {
                Object.defineProperty(target.prototype, name, this.configureDescriptor(behavior, {}));
            }
        };
        BindableProperty.prototype.createObserver = function (executionContext) {
            var _this = this;
            var selfSubscriber = null, defaultValue = this.defaultValue, initialValue;
            if (this.hasOptions) {
                return;
            }
            if (this.changeHandler !== null) {
                selfSubscriber = function (newValue, oldValue) { return executionContext[_this.changeHandler](newValue, oldValue); };
            }
            if (defaultValue !== undefined) {
                initialValue = typeof defaultValue === 'function' ? defaultValue.call(executionContext) : defaultValue;
            }
            return new BehaviorPropertyObserver(this.owner.taskQueue, executionContext, this.name, selfSubscriber, initialValue);
        };
        BindableProperty.prototype.initialize = function (executionContext, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
            var selfSubscriber, observer, attribute, defaultValue = this.defaultValue;
            if (this.isDynamic) {
                for (var key in attributes) {
                    this.createDynamicProperty(executionContext, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
                }
            }
            else if (!this.hasOptions) {
                observer = observerLookup[this.name];
                if (attributes !== undefined) {
                    selfSubscriber = observer.selfSubscriber;
                    attribute = attributes[this.attribute];
                    if (behaviorHandlesBind) {
                        observer.selfSubscriber = null;
                    }
                    if (typeof attribute === 'string') {
                        executionContext[this.name] = attribute;
                        observer.call();
                    }
                    else if (attribute) {
                        boundProperties.push({ observer: observer, binding: attribute.createBinding(executionContext) });
                    }
                    else if (defaultValue !== undefined) {
                        observer.call();
                    }
                    observer.selfSubscriber = selfSubscriber;
                }
                observer.publishing = true;
            }
        };
        BindableProperty.prototype.createDynamicProperty = function (executionContext, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
            var changeHandlerName = name + 'Changed', selfSubscriber = null, observer, info;
            if (changeHandlerName in executionContext) {
                selfSubscriber = function (newValue, oldValue) { return executionContext[changeHandlerName](newValue, oldValue); };
            }
            else if ('dynamicPropertyChanged' in executionContext) {
                selfSubscriber = function (newValue, oldValue) { return executionContext['dynamicPropertyChanged'](name, newValue, oldValue); };
            }
            observer = observerLookup[name] = new BehaviorPropertyObserver(this.owner.taskQueue, executionContext, name, selfSubscriber);
            Object.defineProperty(executionContext, name, {
                configurable: true,
                enumerable: true,
                get: observer.getValue.bind(observer),
                set: observer.setValue.bind(observer)
            });
            if (behaviorHandlesBind) {
                observer.selfSubscriber = null;
            }
            if (typeof attribute === 'string') {
                executionContext[name] = attribute;
                observer.call();
            }
            else if (attribute) {
                info = { observer: observer, binding: attribute.createBinding(executionContext) };
                boundProperties.push(info);
            }
            observer.publishing = true;
            observer.selfSubscriber = selfSubscriber;
        };
        return BindableProperty;
    })();
    exports.BindableProperty = BindableProperty;
    var BehaviorPropertyObserver = (function () {
        function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
            this.taskQueue = taskQueue;
            this.obj = obj;
            this.propertyName = propertyName;
            this.callbacks = [];
            this.notqueued = true;
            this.publishing = false;
            this.selfSubscriber = selfSubscriber;
            this.currentValue = this.oldValue = initialValue;
        }
        BehaviorPropertyObserver.prototype.getValue = function () {
            return this.currentValue;
        };
        BehaviorPropertyObserver.prototype.setValue = function (newValue) {
            var oldValue = this.currentValue;
            if (oldValue != newValue) {
                if (this.publishing && this.notqueued) {
                    this.notqueued = false;
                    this.taskQueue.queueMicroTask(this);
                }
                this.oldValue = oldValue;
                this.currentValue = newValue;
            }
        };
        BehaviorPropertyObserver.prototype.call = function () {
            var callbacks = this.callbacks, i = callbacks.length, oldValue = this.oldValue, newValue = this.currentValue;
            this.notqueued = true;
            if (newValue != oldValue) {
                if (this.selfSubscriber !== null) {
                    this.selfSubscriber(newValue, oldValue);
                }
                while (i--) {
                    callbacks[i](newValue, oldValue);
                }
                this.oldValue = newValue;
            }
        };
        BehaviorPropertyObserver.prototype.subscribe = function (callback) {
            var callbacks = this.callbacks;
            callbacks.push(callback);
            return function () {
                callbacks.splice(callbacks.indexOf(callback), 1);
            };
        };
        return BehaviorPropertyObserver;
    })();
    exports.BehaviorPropertyObserver = BehaviorPropertyObserver;
});

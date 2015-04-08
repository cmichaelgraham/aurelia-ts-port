define(["require", "exports", './util', '../binding/index'], function (require, exports, util_1, index_1) {
    function getObserver(behavior, instance, name) {
        var lookup = instance.__observers__;
        if (lookup === undefined) {
            lookup = behavior.observerLocator.getObserversLookup(this);
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
            this.defaultBindingMode = this.defaultBindingMode || index_1.ONE_WAY;
            this.owner = null;
        }
        BindableProperty.prototype.registerWith = function (target, behavior) {
            var handlerName;
            if (this.changeHandler === undefined) {
                handlerName = this.name + 'Changed';
                if (handlerName in target.prototype) {
                    this.changeHandler = handlerName;
                }
            }
            behavior.properties.push(this);
            behavior.attributes[this.attribute] = this;
            this.owner = behavior;
        };
        BindableProperty.prototype.defineOn = function (target, behavior) {
            var name = this.name;
            Object.defineProperty(target.prototype, name, {
                configurable: true,
                enumerable: true,
                get: function () {
                    return getObserver(behavior, this, name).getValue();
                },
                set: function (value) {
                    getObserver(behavior, this, name).setValue(value);
                }
            });
        };
        BindableProperty.prototype.createObserver = function (executionContext) {
            var _this = this;
            var selfSubscriber = null;
            if (this.hasOptions || this.isDynamic) {
                return;
            }
            if (this.changeHandler !== undefined) {
                selfSubscriber = function (newValue, oldValue) { return executionContext[_this.changeHandler](newValue, oldValue); };
            }
            return new BehaviorPropertyObserver(this.owner.taskQueue, executionContext, this.name, selfSubscriber);
        };
        BindableProperty.prototype.initialize = function (executionContext, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
            var selfSubscriber, observer, attribute;
            if (this.hasOptions) {
                return;
            }
            else if (this.isDynamic) {
                for (var key in attributes) {
                    this.createDynamicProperty(executionContext, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
                }
            }
            else {
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
                    else if (this.defaultValue) {
                        executionContext[this.name] = this.defaultValue;
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
        function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber) {
            this.taskQueue = taskQueue;
            this.obj = obj;
            this.propertyName = propertyName;
            this.callbacks = [];
            this.notqueued = true;
            this.publishing = false;
            this.selfSubscriber = selfSubscriber;
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
});

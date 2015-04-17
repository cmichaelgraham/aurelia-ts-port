var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", './util', 'aurelia-binding'], function (require, exports, util_1, aurelia_binding_1) {
    var BehaviorProperty = (function () {
        function BehaviorProperty(name, changeHandler, attribute, defaultValue, defaultBindingMode) {
            this.name = name;
            this.changeHandler = changeHandler;
            this.attribute = attribute || util_1.hyphenate(name);
            this.defaultValue = defaultValue;
            this.defaultBindingMode = defaultBindingMode || aurelia_binding_1.ONE_WAY;
        }
        BehaviorProperty.prototype.bindingIsTwoWay = function () {
            this.defaultBindingMode = aurelia_binding_1.TWO_WAY;
            return this;
        };
        BehaviorProperty.prototype.bindingIsOneWay = function () {
            this.defaultBindingMode = aurelia_binding_1.ONE_WAY;
            return this;
        };
        BehaviorProperty.prototype.bindingIsOneTime = function () {
            this.defaultBindingMode = aurelia_binding_1.ONE_TIME;
            return this;
        };
        BehaviorProperty.prototype.define = function (taskQueue, behavior) {
            var that = this, handlerName;
            this.taskQueue = taskQueue;
            if (!this.changeHandler) {
                handlerName = this.name + 'Changed';
                if (handlerName in behavior.target.prototype) {
                    this.changeHandler = handlerName;
                }
            }
            behavior.properties.push(this);
            behavior.attributes[this.attribute] = this;
            Object.defineProperty(behavior.target.prototype, this.name, {
                configurable: true,
                enumerable: true,
                get: function () {
                    return this.__observers__[that.name].getValue();
                },
                set: function (value) {
                    this.__observers__[that.name].setValue(value);
                }
            });
        };
        BehaviorProperty.prototype.createObserver = function (executionContext) {
            var _this = this;
            var selfSubscriber = null;
            if (this.changeHandler) {
                selfSubscriber = function (newValue, oldValue) { return executionContext[_this.changeHandler](newValue, oldValue); };
            }
            return new BehaviorPropertyObserver(this.taskQueue, executionContext, this.name, selfSubscriber);
        };
        BehaviorProperty.prototype.initialize = function (executionContext, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
            var selfSubscriber, observer, attribute;
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
        };
        return BehaviorProperty;
    })();
    exports.BehaviorProperty = BehaviorProperty;
    var OptionsProperty = (function (_super) {
        __extends(OptionsProperty, _super);
        function OptionsProperty(attribute) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            _super.call(this);
            if (typeof attribute === 'string') {
                this.attribute = attribute;
            }
            else if (attribute) {
                rest.unshift(attribute);
            }
            this.properties = rest;
            this.hasOptions = true;
        }
        OptionsProperty.prototype.dynamic = function () {
            this.isDynamic = true;
            return this;
        };
        OptionsProperty.prototype.withProperty = function (name, changeHandler, attribute, defaultValue, defaultBindingMode) {
            this.properties.push(new BehaviorProperty(name, changeHandler, attribute, defaultValue, defaultBindingMode));
            return this;
        };
        OptionsProperty.prototype.define = function (taskQueue, behavior) {
            var i, ii, properties = this.properties;
            this.taskQueue = taskQueue;
            this.attribute = this.attribute || behavior.name;
            behavior.properties.push(this);
            behavior.attributes[this.attribute] = this;
            for (i = 0, ii = properties.length; i < ii; ++i) {
                properties[i].define(taskQueue, behavior);
            }
        };
        OptionsProperty.prototype.createObserver = function (executionContext) { };
        OptionsProperty.prototype.initialize = function (executionContext, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
            var value, key, info;
            if (!this.isDynamic) {
                return;
            }
            for (key in attributes) {
                this.createDynamicProperty(executionContext, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
            }
        };
        OptionsProperty.prototype.createDynamicProperty = function (executionContext, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
            var changeHandlerName = name + 'Changed', selfSubscriber = null, observer, info;
            if (changeHandlerName in executionContext) {
                selfSubscriber = function (newValue, oldValue) { return executionContext[changeHandlerName](newValue, oldValue); };
            }
            else if ('dynamicPropertyChanged' in executionContext) {
                selfSubscriber = function (newValue, oldValue) { return executionContext['dynamicPropertyChanged'](name, newValue, oldValue); };
            }
            observer = observerLookup[name] = new BehaviorPropertyObserver(this.taskQueue, executionContext, name, selfSubscriber);
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
        return OptionsProperty;
    })(BehaviorProperty);
    exports.OptionsProperty = OptionsProperty;
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

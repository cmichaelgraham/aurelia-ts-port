define(["require", "exports"], function (require, exports) {
    var SetterObserver = (function () {
        function SetterObserver(taskQueue, obj, propertyName) {
            this.taskQueue = taskQueue;
            this.obj = obj;
            this.propertyName = propertyName;
            this.callbacks = [];
            this.queued = false;
            this.observing = false;
        }
        SetterObserver.prototype.getValue = function () {
            return this.obj[this.propertyName];
        };
        SetterObserver.prototype.setValue = function (newValue) {
            this.obj[this.propertyName] = newValue;
        };
        SetterObserver.prototype.getterValue = function () {
            return this.currentValue;
        };
        SetterObserver.prototype.setterValue = function (newValue) {
            var oldValue = this.currentValue;
            if (oldValue !== newValue) {
                if (!this.queued) {
                    this.oldValue = oldValue;
                    this.queued = true;
                    this.taskQueue.queueMicroTask(this);
                }
                this.currentValue = newValue;
            }
        };
        SetterObserver.prototype.call = function () {
            var callbacks = this.callbacks, i = callbacks.length, oldValue = this.oldValue, newValue = this.currentValue;
            this.queued = false;
            while (i--) {
                callbacks[i](newValue, oldValue);
            }
        };
        SetterObserver.prototype.subscribe = function (callback) {
            var callbacks = this.callbacks;
            callbacks.push(callback);
            if (!this.observing) {
                this.convertProperty();
            }
            return function () {
                callbacks.splice(callbacks.indexOf(callback), 1);
            };
        };
        SetterObserver.prototype.convertProperty = function () {
            this.observing = true;
            this.currentValue = this.obj[this.propertyName];
            this.setValue = this.setterValue;
            this.getValue = this.getterValue;
            try {
                Object.defineProperty(this.obj, this.propertyName, {
                    configurable: true,
                    enumerable: true,
                    get: this.getValue.bind(this),
                    set: this.setValue.bind(this)
                });
            }
            catch (_) { }
        };
        return SetterObserver;
    })();
    exports.SetterObserver = SetterObserver;
    var OoObjectObserver = (function () {
        function OoObjectObserver(obj, observerLocator) {
            this.obj = obj;
            this.observers = {};
            this.observerLocator = observerLocator;
        }
        OoObjectObserver.prototype.subscribe = function (propertyObserver, callback) {
            var _this = this;
            var callbacks = propertyObserver.callbacks;
            callbacks.push(callback);
            if (!this.observing) {
                this.observing = true;
                try {
                    Object.observe(this.obj, function (changes) { return _this.handleChanges(changes); }, ['update', 'add']);
                }
                catch (_) { }
            }
            return function () {
                callbacks.splice(callbacks.indexOf(callback), 1);
            };
        };
        OoObjectObserver.prototype.getObserver = function (propertyName, descriptor) {
            var propertyObserver = this.observers[propertyName];
            if (!propertyObserver) {
                if (descriptor) {
                    propertyObserver = this.observers[propertyName] = new OoPropertyObserver(this, this.obj, propertyName);
                }
                else {
                    propertyObserver = this.observers[propertyName] = new UndefinedPropertyObserver(this, this.obj, propertyName);
                }
            }
            return propertyObserver;
        };
        OoObjectObserver.prototype.handleChanges = function (changeRecords) {
            var updates = {}, observers = this.observers, change, observer;
            for (var i = 0, ii = changeRecords.length; i < ii; ++i) {
                change = changeRecords[i];
                updates[change.name] = change;
            }
            for (var key in updates) {
                observer = observers[key],
                    change = updates[key];
                if (observer) {
                    observer.trigger(change.object[key], change.oldValue);
                }
            }
        };
        return OoObjectObserver;
    })();
    exports.OoObjectObserver = OoObjectObserver;
    var OoPropertyObserver = (function () {
        function OoPropertyObserver(owner, obj, propertyName) {
            this.owner = owner;
            this.obj = obj;
            this.propertyName = propertyName;
            this.callbacks = [];
        }
        OoPropertyObserver.prototype.getValue = function () {
            return this.obj[this.propertyName];
        };
        OoPropertyObserver.prototype.setValue = function (newValue) {
            this.obj[this.propertyName] = newValue;
        };
        OoPropertyObserver.prototype.trigger = function (newValue, oldValue) {
            var callbacks = this.callbacks, i = callbacks.length;
            while (i--) {
                callbacks[i](newValue, oldValue);
            }
        };
        OoPropertyObserver.prototype.subscribe = function (callback) {
            return this.owner.subscribe(this, callback);
        };
        return OoPropertyObserver;
    })();
    exports.OoPropertyObserver = OoPropertyObserver;
    var UndefinedPropertyObserver = (function () {
        function UndefinedPropertyObserver(owner, obj, propertyName) {
            this.owner = owner;
            this.obj = obj;
            this.propertyName = propertyName;
            this.callbackMap = new Map();
            this.callbacks = []; // unused here, but required by owner OoObjectObserver.
        }
        UndefinedPropertyObserver.prototype.getValue = function () {
            // delegate this to the actual observer if possible.
            if (this.actual) {
                return this.actual.getValue();
            }
            return this.obj[this.propertyName];
        };
        UndefinedPropertyObserver.prototype.setValue = function (newValue) {
            // delegate this to the actual observer if possible.
            if (this.actual) {
                this.actual.setValue(newValue);
                return;
            }
            // define the property and trigger the callbacks.
            this.obj[this.propertyName] = newValue;
            this.trigger(newValue, undefined);
        };
        UndefinedPropertyObserver.prototype.trigger = function (newValue, oldValue) {
            var callback;
            // we only care about this event one time:  when the property becomes defined.
            if (this.subscription) {
                this.subscription();
            }
            // get the actual observer.
            this.getObserver();
            // invoke the callbacks.
            for (var _i = 0, _a = this.callbackMap.keys(); _i < _a.length; _i++) {
                callback = _a[_i];
                callback(newValue, oldValue);
            }
        };
        UndefinedPropertyObserver.prototype.getObserver = function () {
            var callback, observerLocator;
            // has the property has been defined?
            if (!Object.getOwnPropertyDescriptor(this.obj, this.propertyName)) {
                return;
            }
            // get the actual observer.
            observerLocator = this.owner.observerLocator;
            delete this.owner.observers[this.propertyName];
            delete observerLocator.getObserversLookup(this.obj, observerLocator)[this.propertyName];
            this.actual = observerLocator.getObserver(this.obj, this.propertyName);
            // attach any existing callbacks to the actual observer.
            for (var _i = 0, _a = this.callbackMap.keys(); _i < _a.length; _i++) {
                callback = _a[_i];
                this.callbackMap.set(callback, this.actual.subscribe(callback));
            }
        };
        UndefinedPropertyObserver.prototype.subscribe = function (callback) {
            var _this = this;
            // attempt to get the actual observer in case the property has become
            // defined since the ObserverLocator returned [this].
            if (!this.actual) {
                this.getObserver();
            }
            // if we have the actual observer, use it.
            if (this.actual) {
                return this.actual.subscribe(callback);
            }
            // start listening for the property to become defined.
            if (!this.subscription) {
                this.subscription = this.owner.subscribe(this);
            }
            // cache the callback.
            this.callbackMap.set(callback, null);
            // return the method to dispose the subscription.
            return function () {
                var actualDispose = _this.callbackMap.get(callback);
                if (actualDispose)
                    actualDispose();
                _this.callbackMap.delete(callback);
            };
        };
        return UndefinedPropertyObserver;
    })();
    exports.UndefinedPropertyObserver = UndefinedPropertyObserver;
});

define(["require", "exports"], function (require, exports) {
    var XLinkAttributeObserver = (function () {
        function XLinkAttributeObserver(element, propertyName, attributeName) {
            this.element = element;
            this.propertyName = propertyName;
            this.attributeName = attributeName;
        }
        XLinkAttributeObserver.prototype.getValue = function () {
            return this.element.getAttributeNS('http://www.w3.org/1999/xlink', this.attributeName);
        };
        XLinkAttributeObserver.prototype.setValue = function (newValue) {
            return this.element.setAttributeNS('http://www.w3.org/1999/xlink', this.attributeName, newValue);
        };
        XLinkAttributeObserver.prototype.subscribe = function (callback) {
            throw new Error("Observation of an Element's \"" + this.propertyName + "\" property is not supported.");
        };
        return XLinkAttributeObserver;
    })();
    exports.XLinkAttributeObserver = XLinkAttributeObserver;
    var DataAttributeObserver = (function () {
        function DataAttributeObserver(element, propertyName) {
            this.element = element;
            this.propertyName = propertyName;
        }
        DataAttributeObserver.prototype.getValue = function () {
            return this.element.getAttribute(this.propertyName);
        };
        DataAttributeObserver.prototype.setValue = function (newValue) {
            return this.element.setAttribute(this.propertyName, newValue);
        };
        DataAttributeObserver.prototype.subscribe = function (callback) {
            throw new Error("Observation of an Element's \"" + this.propertyName + "\" property is not supported.");
        };
        return DataAttributeObserver;
    })();
    exports.DataAttributeObserver = DataAttributeObserver;
    var StyleObserver = (function () {
        function StyleObserver(element, propertyName) {
            this.element = element;
            this.propertyName = propertyName;
        }
        StyleObserver.prototype.getValue = function () {
            return this.element.style.cssText;
        };
        StyleObserver.prototype.setValue = function (newValue) {
            if (newValue instanceof Object) {
                newValue = this.flattenCss(newValue);
            }
            this.element.style.cssText = newValue;
        };
        StyleObserver.prototype.subscribe = function (callback) {
            throw new Error("Observation of an Element's \"" + this.propertyName + "\" property is not supported.");
        };
        StyleObserver.prototype.flattenCss = function (object) {
            var s = '';
            for (var propertyName in object) {
                if (object.hasOwnProperty(propertyName)) {
                    s += propertyName + ': ' + object[propertyName] + '; ';
                }
            }
            return s;
        };
        return StyleObserver;
    })();
    exports.StyleObserver = StyleObserver;
    var ValueAttributeObserver = (function () {
        function ValueAttributeObserver(element, propertyName, handler) {
            this.element = element;
            this.propertyName = propertyName;
            this.handler = handler;
            this.callbacks = [];
        }
        ValueAttributeObserver.prototype.getValue = function () {
            return this.element[this.propertyName];
        };
        ValueAttributeObserver.prototype.setValue = function (newValue) {
            this.element[this.propertyName] = newValue;
            this.call();
        };
        ValueAttributeObserver.prototype.call = function () {
            var callbacks = this.callbacks, i = callbacks.length, oldValue = this.oldValue, newValue = this.getValue();
            while (i--) {
                callbacks[i](newValue, oldValue);
            }
            this.oldValue = newValue;
        };
        ValueAttributeObserver.prototype.subscribe = function (callback) {
            var that = this;
            if (!this.disposeHandler) {
                this.oldValue = this.getValue();
                this.disposeHandler = this.handler.subscribe(this.element, this.call.bind(this));
            }
            this.callbacks.push(callback);
            return this.unsubscribe.bind(this, callback);
        };
        ValueAttributeObserver.prototype.unsubscribe = function (callback) {
            var callbacks = this.callbacks;
            callbacks.splice(callbacks.indexOf(callback), 1);
            if (callbacks.length === 0) {
                this.disposeHandler();
                this.disposeHandler = null;
            }
        };
        return ValueAttributeObserver;
    })();
    exports.ValueAttributeObserver = ValueAttributeObserver;
    var SelectValueObserver = (function () {
        function SelectValueObserver(element, handler, observerLocator) {
            this.element = element;
            this.handler = handler;
            this.observerLocator = observerLocator;
        }
        SelectValueObserver.prototype.getValue = function () {
            return this.value;
        };
        SelectValueObserver.prototype.setValue = function (newValue) {
            var _this = this;
            if (newValue !== null && newValue !== undefined && this.element.multiple && !Array.isArray(newValue)) {
                throw new Error('Only null or Array instances can be bound to a multi-select.');
            }
            if (this.value === newValue) {
                return;
            }
            // unsubscribe from old array.
            if (this.arraySubscription) {
                this.arraySubscription();
                this.arraySubscription = null;
            }
            // subscribe to new array.
            if (Array.isArray(newValue)) {
                this.arraySubscription = this.observerLocator.getArrayObserver(newValue)
                    .subscribe(this.synchronizeOptions.bind(this));
            }
            // assign and sync element.
            this.value = newValue;
            this.synchronizeOptions();
            // queue up an initial sync after the bindings have been evaluated.
            if (this.element.options.length > 0 && !this.initialSync) {
                this.initialSync = true;
                this.observerLocator.taskQueue.queueMicroTask({ call: function () { return _this.synchronizeOptions(); } });
            }
        };
        SelectValueObserver.prototype.synchronizeOptions = function () {
            var value = this.value, i, options, option, optionValue, clear, isArray;
            if (value === null || value === undefined) {
                clear = true;
            }
            else if (Array.isArray(value)) {
                isArray = true;
            }
            options = this.element.options;
            i = options.length;
            while (i--) {
                option = options.item(i);
                if (clear) {
                    option.selected = false;
                    continue;
                }
                optionValue = option.hasOwnProperty('model') ? option.model : option.value;
                if (isArray) {
                    option.selected = value.indexOf(optionValue) !== -1;
                    continue;
                }
                option.selected = value === optionValue;
            }
        };
        SelectValueObserver.prototype.synchronizeValue = function () {
            var options = this.element.options, option, i, ii, count = 0, value = [];
            for (i = 0, ii = options.length; i < ii; i++) {
                option = options.item(i);
                if (!option.selected) {
                    continue;
                }
                value[count] = option.hasOwnProperty('model') ? option.model : option.value;
                count++;
            }
            if (!this.element.multiple) {
                if (count === 0) {
                    value = null;
                }
                else {
                    value = value[0];
                }
            }
            this.oldValue = this.value;
            this.value = value;
            this.call();
        };
        SelectValueObserver.prototype.call = function () {
            var callbacks = this.callbacks, i = callbacks.length, oldValue = this.oldValue, newValue = this.value;
            while (i--) {
                callbacks[i](newValue, oldValue);
            }
        };
        SelectValueObserver.prototype.subscribe = function (callback) {
            if (!this.callbacks) {
                this.callbacks = [];
                this.disposeHandler = this.handler
                    .subscribe(this.element, this.synchronizeValue.bind(this, false));
            }
            this.callbacks.push(callback);
            return this.unsubscribe.bind(this, callback);
        };
        SelectValueObserver.prototype.unsubscribe = function (callback) {
            var callbacks = this.callbacks;
            callbacks.splice(callbacks.indexOf(callback), 1);
            if (callbacks.length === 0) {
                this.disposeHandler();
                this.disposeHandler = null;
                this.callbacks = null;
            }
        };
        SelectValueObserver.prototype.bind = function () {
            var _this = this;
            this.domObserver = new MutationObserver(function () {
                _this.synchronizeOptions();
                _this.synchronizeValue();
            });
            this.domObserver.observe(this.element, { childList: true, subtree: true });
        };
        SelectValueObserver.prototype.unbind = function () {
            this.domObserver.disconnect();
            this.domObserver = null;
            if (this.arraySubscription) {
                this.arraySubscription();
                this.arraySubscription = null;
            }
        };
        return SelectValueObserver;
    })();
    exports.SelectValueObserver = SelectValueObserver;
    var CheckedObserver = (function () {
        function CheckedObserver(element, handler, observerLocator) {
            this.element = element;
            this.handler = handler;
            this.observerLocator = observerLocator;
        }
        CheckedObserver.prototype.getValue = function () {
            return this.value;
        };
        CheckedObserver.prototype.setValue = function (newValue) {
            var _this = this;
            if (this.value === newValue) {
                return;
            }
            // unsubscribe from old array.
            if (this.arraySubscription) {
                this.arraySubscription();
                this.arraySubscription = null;
            }
            // subscribe to new array.
            if (this.element.type === 'checkbox' && Array.isArray(newValue)) {
                this.arraySubscription = this.observerLocator.getArrayObserver(newValue)
                    .subscribe(this.synchronizeElement.bind(this));
            }
            // assign and sync element.
            this.value = newValue;
            this.synchronizeElement();
            // queue up an initial sync after the bindings have been evaluated.
            if (!this.element.hasOwnProperty('model') && !this.initialSync) {
                this.initialSync = true;
                this.observerLocator.taskQueue.queueMicroTask({ call: function () { return _this.synchronizeElement(); } });
            }
        };
        CheckedObserver.prototype.synchronizeElement = function () {
            var value = this.value, element = this.element, elementValue = element.hasOwnProperty('model') ? element.model : element.value, isRadio = element.type === 'radio';
            element.checked =
                isRadio && value === elementValue
                    || !isRadio && value === true
                    || !isRadio && Array.isArray(value) && value.indexOf(elementValue) !== -1;
        };
        CheckedObserver.prototype.synchronizeValue = function () {
            var value = this.value, element = this.element, elementValue = element.hasOwnProperty('model') ? element.model : element.value, index;
            if (element.type === 'checkbox') {
                if (Array.isArray(value)) {
                    index = value.indexOf(elementValue);
                    if (element.checked && index === -1) {
                        value.push(elementValue);
                    }
                    else if (!element.checked && index !== -1) {
                        value.splice(index, 1);
                    }
                    // don't invoke callbacks.
                    return;
                }
                else {
                    value = element.checked;
                }
            }
            else if (element.checked) {
                value = elementValue;
            }
            else {
                // don't invoke callbacks.
                return;
            }
            this.oldValue = this.value;
            this.value = value;
            this.call();
        };
        CheckedObserver.prototype.call = function () {
            var callbacks = this.callbacks, i = callbacks.length, oldValue = this.oldValue, newValue = this.value;
            while (i--) {
                callbacks[i](newValue, oldValue);
            }
        };
        CheckedObserver.prototype.subscribe = function (callback) {
            if (!this.callbacks) {
                this.callbacks = [];
                this.disposeHandler = this.handler
                    .subscribe(this.element, this.synchronizeValue.bind(this, false));
            }
            this.callbacks.push(callback);
            return this.unsubscribe.bind(this, callback);
        };
        CheckedObserver.prototype.unsubscribe = function (callback) {
            var callbacks = this.callbacks;
            callbacks.splice(callbacks.indexOf(callback), 1);
            if (callbacks.length === 0) {
                this.disposeHandler();
                this.disposeHandler = null;
                this.callbacks = null;
            }
        };
        CheckedObserver.prototype.unbind = function () {
            if (this.arraySubscription) {
                this.arraySubscription();
                this.arraySubscription = null;
            }
        };
        return CheckedObserver;
    })();
    exports.CheckedObserver = CheckedObserver;
});

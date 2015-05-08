var DefaultEventStrategy = (function () {
    function DefaultEventStrategy() {
        this.delegatedEvents = {};
    }
    DefaultEventStrategy.prototype.ensureDelegatedEvent = function (eventName) {
        if (this.delegatedEvents[eventName]) {
            return;
        }
        this.delegatedEvents[eventName] = true;
        document.addEventListener(eventName, this.handleDelegatedEvent.bind(this), false);
    };
    DefaultEventStrategy.prototype.handleCallbackResult = function (result) {
        //todo: coroutine via result?
    };
    DefaultEventStrategy.prototype.handleDelegatedEvent = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement, callback;
        while (target && !callback) {
            if (target.delegatedEvents) {
                callback = target.delegatedEvents[event.type];
            }
            if (!callback) {
                target = target.parentNode;
            }
        }
        if (callback) {
            this.handleCallbackResult(callback(event));
        }
    };
    DefaultEventStrategy.prototype.createDirectEventCallback = function (callback) {
        var _this = this;
        return function (event) {
            _this.handleCallbackResult(callback(event));
        };
    };
    DefaultEventStrategy.prototype.subscribeToDelegatedEvent = function (target, targetEvent, callback) {
        var lookup = target.delegatedEvents || (target.delegatedEvents = {});
        this.ensureDelegatedEvent(targetEvent);
        lookup[targetEvent] = callback;
        return function () {
            lookup[targetEvent] = null;
        };
    };
    DefaultEventStrategy.prototype.subscribeToDirectEvent = function (target, targetEvent, callback) {
        var directEventCallback = this.createDirectEventCallback(callback);
        target.addEventListener(targetEvent, directEventCallback, false);
        return function () {
            target.removeEventListener(targetEvent, directEventCallback);
        };
    };
    DefaultEventStrategy.prototype.subscribe = function (target, targetEvent, callback, delegate) {
        if (delegate) {
            return this.subscribeToDirectEvent(target, targetEvent, callback);
        }
        else {
            return this.subscribeToDelegatedEvent(target, targetEvent, callback);
        }
    };
    return DefaultEventStrategy;
})();
var EventManager = (function () {
    function EventManager() {
        this.elementHandlerLookup = {};
        this.eventStrategyLookup = {};
        this.registerElementConfig({
            tagName: 'input',
            properties: {
                value: ['change', 'input'],
                checked: ['change', 'input']
            }
        });
        this.registerElementConfig({
            tagName: 'textarea',
            properties: {
                value: ['change', 'input']
            }
        });
        this.registerElementConfig({
            tagName: 'select',
            properties: {
                value: ['change']
            }
        });
        this.registerElementConfig({
            tagName: 'content editable',
            properties: {
                value: ['change', 'input', 'blur', 'keyup', 'paste'],
            }
        });
        this.defaultEventStrategy = new DefaultEventStrategy();
    }
    EventManager.prototype.registerElementConfig = function (config) {
        var tagName = config.tagName.toLowerCase(), properties = config.properties, propertyName;
        this.elementHandlerLookup[tagName] = {};
        for (propertyName in properties) {
            if (properties.hasOwnProperty(propertyName)) {
                this.registerElementPropertyConfig(tagName, propertyName, properties[propertyName]);
            }
        }
    };
    EventManager.prototype.registerElementPropertyConfig = function (tagName, propertyName, events) {
        this.elementHandlerLookup[tagName][propertyName] = {
            subscribe: function (target, callback) {
                events.forEach(function (changeEvent) {
                    target.addEventListener(changeEvent, callback, false);
                });
                return function () {
                    events.forEach(function (changeEvent) {
                        target.removeEventListener(changeEvent, callback);
                    });
                };
            }
        };
    };
    EventManager.prototype.registerElementHandler = function (tagName, handler) {
        this.elementHandlerLookup[tagName.toLowerCase()] = handler;
    };
    EventManager.prototype.registerEventStrategy = function (eventName, strategy) {
        this.eventStrategyLookup[eventName] = strategy;
    };
    EventManager.prototype.getElementHandler = function (target, propertyName) {
        var tagName, lookup = this.elementHandlerLookup;
        if (target.tagName) {
            tagName = target.tagName.toLowerCase();
            if (lookup[tagName] && lookup[tagName][propertyName]) {
                return lookup[tagName][propertyName];
            }
            if (propertyName === 'textContent' || propertyName === 'innerHTML') {
                return lookup['content editable']['value'];
            }
        }
        return null;
    };
    EventManager.prototype.addEventListener = function (target, targetEvent, callback, delegate) {
        return (this.eventStrategyLookup[targetEvent] || this.defaultEventStrategy)
            .subscribe(target, targetEvent, callback, delegate);
    };
    return EventManager;
})();
exports.EventManager = EventManager;

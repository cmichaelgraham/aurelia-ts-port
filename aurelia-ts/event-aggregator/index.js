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
define(["require", "exports"], function (require, exports) {
    var Handler = (function () {
        function Handler(messageType, callback) {
            this.messageType = messageType;
            this.callback = callback;
        }
        Handler.prototype.handle = function (message) {
            if (message instanceof this.messageType) {
                this.callback.call(null, message);
            }
        };
        return Handler;
    })();
    var EventAggregator = (function () {
        function EventAggregator() {
            this.eventLookup = {};
            this.messageHandlers = [];
        }
        EventAggregator.prototype.publish = function (event, data) {
            var subscribers, i;
            if (typeof event === 'string') {
                subscribers = this.eventLookup[event];
                if (subscribers) {
                    subscribers = subscribers.slice();
                    i = subscribers.length;
                    while (i--) {
                        subscribers[i](data, event);
                    }
                }
            }
            else {
                subscribers = this.messageHandlers.slice();
                i = subscribers.length;
                while (i--) {
                    subscribers[i].handle(event);
                }
            }
        };
        EventAggregator.prototype.subscribe = function (event, callback) {
            var subscribers, handler;
            if (typeof event === 'string') {
                subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
                subscribers.push(callback);
                return function () {
                    subscribers.splice(subscribers.indexOf(callback), 1);
                };
            }
            else {
                handler = new Handler(event, callback);
                subscribers = this.messageHandlers;
                subscribers.push(handler);
                return function () {
                    subscribers.splice(subscribers.indexOf(handler), 1);
                };
            }
        };
        EventAggregator.prototype.subscribeOnce = function (event, callback) {
            var sub = this.subscribe(event, function (data, event) {
                sub();
                return callback(data, event);
            });
            return sub;
        };
        return EventAggregator;
    })();
    exports.EventAggregator = EventAggregator;
    function includeEventsIn(obj) {
        var ea = new EventAggregator();
        obj.subscribe = function (event, callback) {
            return ea.subscribe(event, callback);
        };
        obj.publish = function (event, data) {
            ea.publish(event, data);
        };
        return ea;
    }
    exports.includeEventsIn = includeEventsIn;
    function install(aurelia) {
        aurelia.withInstance(EventAggregator, includeEventsIn(aurelia));
    }
    exports.install = install;
});

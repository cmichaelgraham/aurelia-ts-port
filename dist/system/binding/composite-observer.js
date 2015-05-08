System.register([], function(exports_1) {
    var CompositeObserver;
    return {
        setters:[],
        execute: function() {
            CompositeObserver = (function () {
                function CompositeObserver(observers, evaluate) {
                    var _this = this;
                    this.subscriptions = new Array(observers.length);
                    this.evaluate = evaluate;
                    for (var i = 0, ii = observers.length; i < ii; i++) {
                        this.subscriptions[i] = observers[i].subscribe(function (newValue) {
                            _this.notify(_this.evaluate());
                        });
                    }
                }
                CompositeObserver.prototype.subscribe = function (callback) {
                    var that = this;
                    that.callback = callback;
                    return function () {
                        that.callback = null;
                    };
                };
                CompositeObserver.prototype.notify = function (newValue) {
                    var callback = this.callback;
                    if (callback) {
                        callback(newValue);
                    }
                };
                CompositeObserver.prototype.dispose = function () {
                    var subscriptions = this.subscriptions;
                    var i = subscriptions.length;
                    while (i--) {
                        subscriptions[i]();
                    }
                };
                return CompositeObserver;
            })();
            exports_1("CompositeObserver", CompositeObserver);
        }
    }
});

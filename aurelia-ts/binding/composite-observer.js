var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports"], function (require, exports) {
    var CompositeObserver = (function () {
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
    exports.CompositeObserver = CompositeObserver;
});

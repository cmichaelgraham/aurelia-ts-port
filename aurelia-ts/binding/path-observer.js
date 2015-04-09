var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports"], function (require, exports) {
    var PathObserver = (function () {
        function PathObserver(leftObserver, getRightObserver, value) {
            var _this = this;
            this.leftObserver = leftObserver;
            this.disposeLeft = leftObserver.subscribe(function (newValue) {
                var newRightValue = _this.updateRight(getRightObserver(newValue));
                _this.notify(newRightValue);
            });
            this.updateRight(getRightObserver(value));
        }
        PathObserver.prototype.updateRight = function (observer) {
            var _this = this;
            this.rightObserver = observer;
            if (this.disposeRight) {
                this.disposeRight();
            }
            if (!observer) {
                return null;
            }
            this.disposeRight = observer.subscribe(function (newValue) { return _this.notify(newValue); });
            return observer.getValue();
        };
        PathObserver.prototype.subscribe = function (callback) {
            var that = this;
            that.callback = callback;
            return function () {
                that.callback = null;
            };
        };
        PathObserver.prototype.notify = function (newValue) {
            var callback = this.callback;
            if (callback) {
                callback(newValue);
            }
        };
        PathObserver.prototype.dispose = function () {
            if (this.disposeLeft) {
                this.disposeLeft();
            }
            if (this.disposeRight) {
                this.disposeRight();
            }
        };
        return PathObserver;
    })();
    exports.PathObserver = PathObserver;
});

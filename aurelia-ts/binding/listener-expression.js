var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports"], function (require, exports) {
    var ListenerExpression = (function () {
        function ListenerExpression(eventManager, targetEvent, sourceExpression, delegate, preventDefault) {
            this.eventManager = eventManager;
            this.targetEvent = targetEvent;
            this.sourceExpression = sourceExpression;
            this.delegate = delegate;
            this.discrete = true;
            this.preventDefault = preventDefault;
        }
        ListenerExpression.prototype.createBinding = function (target) {
            return new Listener(this.eventManager, this.targetEvent, this.delegate, this.sourceExpression, target, this.preventDefault);
        };
        return ListenerExpression;
    })();
    exports.ListenerExpression = ListenerExpression;
    var Listener = (function () {
        function Listener(eventManager, targetEvent, delegate, sourceExpression, target, preventDefault) {
            this.eventManager = eventManager;
            this.targetEvent = targetEvent;
            this.delegate = delegate;
            this.sourceExpression = sourceExpression;
            this.target = target;
            this.preventDefault = preventDefault;
        }
        Listener.prototype.bind = function (source) {
            var _this = this;
            if (this._disposeListener) {
                if (this.source === source) {
                    return;
                }
                this.unbind();
            }
            this.source = source;
            this._disposeListener = this.eventManager.addEventListener(this.target, this.targetEvent, function (event) {
                var prevEvent = source.$event;
                source.$event = event;
                var result = _this.sourceExpression.evaluate(source);
                source.$event = prevEvent;
                if (result !== true && _this.preventDefault) {
                    event.preventDefault();
                }
                return result;
            }, this.delegate);
        };
        Listener.prototype.unbind = function () {
            if (this._disposeListener) {
                this._disposeListener();
                this._disposeListener = null;
            }
        };
        return Listener;
    })();
});

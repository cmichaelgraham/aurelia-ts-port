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
define(["require", "exports", '../validation'], function (require, exports, validation_1) {
    var Debouncer = (function () {
        function Debouncer() {
            this.currentFunction = null;
        }
        Debouncer.prototype.debounce = function (func) {
            var _this = this;
            this.currentFunction = func;
            setTimeout(function () {
                if (func !== null && func !== undefined) {
                    if (func === _this.currentFunction) {
                        _this.currentFunction = null;
                        func();
                    }
                }
            }, validation_1.Validation.debounceTime);
        };
        return Debouncer;
    })();
    exports.Debouncer = Debouncer;
});

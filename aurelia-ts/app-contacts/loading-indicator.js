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
define(["require", "exports", 'nprogress', '../framework/index'], function (require, exports, nprogress_1, index_1) {
    var LoadingIndicator = (function () {
        function LoadingIndicator() {
        }
        LoadingIndicator.prototype.loadingChanged = function (newValue) {
            if (newValue) {
                nprogress_1.default.start();
            }
            else {
                nprogress_1.default.done();
            }
        };
        LoadingIndicator = __decorate([index_1.bindable('loading'), index_1.noView], LoadingIndicator);
        return LoadingIndicator;
    })();
    exports.LoadingIndicator = LoadingIndicator;
});

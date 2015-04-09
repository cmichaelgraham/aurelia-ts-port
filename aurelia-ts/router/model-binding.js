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
    var ApplyModelBindersStep = (function () {
        function ApplyModelBindersStep() {
        }
        ApplyModelBindersStep.prototype.run = function (navigationContext, next) {
            //look at each channel and determine if there's a custom binder to be used
            //to transform any of the lifecycleArgs
            //this needs to be done at each level...
            //chache across levels to avoid multiple loads of data, etc.
            return next();
        };
        return ApplyModelBindersStep;
    })();
    exports.ApplyModelBindersStep = ApplyModelBindersStep;
});

var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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

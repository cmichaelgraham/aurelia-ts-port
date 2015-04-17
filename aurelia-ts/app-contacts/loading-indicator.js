var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'nprogress', 'aurelia-framework'], function (require, exports, nprogress_1, aurelia_framework_1) {
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
        LoadingIndicator = __decorate([
            aurelia_framework_1.bindable('loading'),
            aurelia_framework_1.noView
        ], LoadingIndicator);
        return LoadingIndicator;
    })();
    exports.LoadingIndicator = LoadingIndicator;
});

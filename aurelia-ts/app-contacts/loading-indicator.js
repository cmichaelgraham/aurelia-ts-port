var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
        LoadingIndicator = __decorate([
            index_1.bindable('loading'),
            index_1.noView
        ], LoadingIndicator);
        return LoadingIndicator;
    })();
    exports.LoadingIndicator = LoadingIndicator;
});

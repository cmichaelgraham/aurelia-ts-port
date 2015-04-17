var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports"], function (require, exports) {
    var History = (function () {
        function History() {
        }
        History.prototype.activate = function () {
            throw new Error('History must implement activate().');
        };
        History.prototype.deactivate = function () {
            throw new Error('History must implement deactivate().');
        };
        History.prototype.navigate = function () {
            throw new Error('History must implement navigate().');
        };
        History.prototype.navigateBack = function () {
            throw new Error('History must implement navigateBack().');
        };
        return History;
    })();
    exports.History = History;
});

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

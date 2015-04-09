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
    var Animator = (function () {
        function Animator() {
        }
        Animator.configureDefault = function (container, animatorInstance) {
            container.registerInstance(Animator, Animator.instance = (animatorInstance || new Animator()));
        };
        Animator.prototype.move = function () {
            return Promise.resolve(false);
        };
        Animator.prototype.enter = function (element) {
            return Promise.resolve(false);
        };
        Animator.prototype.leave = function (element) {
            return Promise.resolve(false);
        };
        Animator.prototype.removeClass = function (element, className) {
            return Promise.resolve(false);
        };
        Animator.prototype.addClass = function (element, className) {
            return Promise.resolve(false);
        };
        return Animator;
    })();
    exports.Animator = Animator;
});

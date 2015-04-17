var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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

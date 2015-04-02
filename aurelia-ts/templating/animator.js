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

define(["require", "exports", '../templating/index', './animator', './animator'], function (require, exports, index_1, animator_1, animator_2) {
    exports.CssAnimator = animator_2.CssAnimator;
    function install(aurelia) {
        index_1.Animator.configureDefault(aurelia.container, new animator_1.CssAnimator());
    }
    exports.install = install;
});

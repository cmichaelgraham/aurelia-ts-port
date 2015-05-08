define(["require", "exports", 'aurelia-templating', './animator', './animator'], function (require, exports, aurelia_templating_1, animator_1, animator_2) {
    exports.CssAnimator = animator_2.CssAnimator;
    function configure(aurelia) {
        aurelia_templating_1.Animator.configureDefault(aurelia.container, new animator_1.CssAnimator());
    }
    exports.configure = configure;
});

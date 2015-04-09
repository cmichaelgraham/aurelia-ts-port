var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", '../templating/index', './animator', './animator'], function (require, exports, index_1, animator_1, animator_2) {
    exports.CssAnimator = animator_2.CssAnimator;
    function install(aurelia) {
        index_1.Animator.configureDefault(aurelia.container, new animator_1.CssAnimator());
    }
    exports.install = install;
});

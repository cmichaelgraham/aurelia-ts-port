define(["require", "exports", '../templating/index', './animator', './animator'], function (require, exports, _index, _animator, _animator_1) {
    exports.CssAnimator = _animator_1.CssAnimator;
    function install(aurelia) {
        _index.Animator.configureDefault(aurelia.container, new _animator.CssAnimator());
    }
    exports.install = install;
});

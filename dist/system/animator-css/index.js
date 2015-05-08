System.register(['aurelia-templating', './animator', './animator'], function(exports_1) {
    var aurelia_templating_1, animator_1;
    function configure(aurelia) {
        aurelia_templating_1.Animator.configureDefault(aurelia.container, new animator_1.CssAnimator());
    }
    exports_1("configure", configure);
    return {
        setters:[
            function (_aurelia_templating_1) {
                aurelia_templating_1 = _aurelia_templating_1;
            },
            function (_animator_1) {
                animator_1 = _animator_1;
            },
            function (_animator_2) {
                exports_1("CssAnimator", _animator_2["CssAnimator"]);
            }],
        execute: function() {
        }
    }
});

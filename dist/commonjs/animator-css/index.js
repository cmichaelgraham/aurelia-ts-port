var aurelia_templating_1 = require('aurelia-templating');
var animator_1 = require('./animator');
var animator_2 = require('./animator');
exports.CssAnimator = animator_2.CssAnimator;
function configure(aurelia) {
    aurelia_templating_1.Animator.configureDefault(aurelia.container, new animator_1.CssAnimator());
}
exports.configure = configure;

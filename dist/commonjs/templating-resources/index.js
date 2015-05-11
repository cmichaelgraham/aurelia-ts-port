function configure(aurelia) {
    aurelia.globalizeResources('./compose', './if', './with', './repeat', './show', './replaceable', './global-behavior', './sanitize-html');
}
exports.configure = configure;
var compose_1 = require('./compose');
exports.Compose = compose_1.Compose;
var if_1 = require('./if');
exports.If = if_1.If;
var with_1 = require('./with');
exports.With = with_1.With;
var repeat_1 = require('./repeat');
exports.Repeat = repeat_1.Repeat;
var show_1 = require('./show');
exports.Show = show_1.Show;
var global_behavior_1 = require('./global-behavior');
exports.GlobalBehavior = global_behavior_1.GlobalBehavior;
var sanitize_html_1 = require('./sanitize-html');
exports.SanitizeHtmlValueConverter = sanitize_html_1.SanitizeHtmlValueConverter;
var replaceable_1 = require('./replaceable');
exports.Replaceable = replaceable_1.Replaceable;

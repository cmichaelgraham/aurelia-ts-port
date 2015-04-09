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
define(["require", "exports", './compose', './if', './with', './repeat', './show', './global-behavior', './sanitize-html'], function (require, exports, compose_1, if_1, with_1, repeat_1, show_1, global_behavior_1, sanitize_html_1) {
    exports.Compose = compose_1.Compose;
    exports.If = if_1.If;
    exports.With = with_1.With;
    exports.Repeat = repeat_1.Repeat;
    exports.Show = show_1.Show;
    exports.GlobalBehavior = global_behavior_1.GlobalBehavior;
    exports.SanitizeHtmlValueConverter = sanitize_html_1.SanitizeHtmlValueConverter;
    function install(aurelia) {
        aurelia.globalizeResources('./compose', './if', './with', './repeat', './show', './global-behavior', './sanitize-html');
    }
    exports.install = install;
});

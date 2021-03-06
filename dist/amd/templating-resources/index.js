define(["require", "exports", './compose', './if', './with', './repeat', './show', './global-behavior', './sanitize-html', './replaceable'], function (require, exports, compose_1, if_1, with_1, repeat_1, show_1, global_behavior_1, sanitize_html_1, replaceable_1) {
    function configure(aurelia) {
        aurelia.globalizeResources('./compose', './if', './with', './repeat', './show', './replaceable', './global-behavior', './sanitize-html');
    }
    exports.configure = configure;
    exports.Compose = compose_1.Compose;
    exports.If = if_1.If;
    exports.With = with_1.With;
    exports.Repeat = repeat_1.Repeat;
    exports.Show = show_1.Show;
    exports.GlobalBehavior = global_behavior_1.GlobalBehavior;
    exports.SanitizeHtmlValueConverter = sanitize_html_1.SanitizeHtmlValueConverter;
    exports.Replaceable = replaceable_1.Replaceable;
});

define(["require", "exports", './compose', './if', './with', './repeat', './show', './global-behavior', './sanitize-html'], function (require, exports, _compose, _if, _with, _repeat, _show, _global_behavior, _sanitize_html) {
    function install(aurelia) {
        aurelia.globalizeResources('./compose', './if', './with', './repeat', './show', './global-behavior', './sanitize-html');
    }
    exports.install = install;
    exports._compose.Compose = _compose.Compose;
    exports._if.If = _if.If;
    exports._with.With = _with.With;
    exports._repeat.Repeat = _repeat.Repeat;
    exports._show.Show = _show.Show;
    exports._sanitize_html.SanitizeHtmlValueConverter = _sanitize_html.SanitizeHtmlValueConverter;
    exports._global_behavior.GlobalBehavior = _global_behavior.GlobalBehavior;
    exports.install = install;
});

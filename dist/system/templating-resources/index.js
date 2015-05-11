System.register(['./compose', './if', './with', './repeat', './show', './global-behavior', './sanitize-html', './replaceable'], function(exports_1) {
    function configure(aurelia) {
        aurelia.globalizeResources('./compose', './if', './with', './repeat', './show', './replaceable', './global-behavior', './sanitize-html');
    }
    exports_1("configure", configure);
    return {
        setters:[
            function (_compose_1) {
                exports_1("Compose", _compose_1["Compose"]);
            },
            function (_if_1) {
                exports_1("If", _if_1["If"]);
            },
            function (_with_1) {
                exports_1("With", _with_1["With"]);
            },
            function (_repeat_1) {
                exports_1("Repeat", _repeat_1["Repeat"]);
            },
            function (_show_1) {
                exports_1("Show", _show_1["Show"]);
            },
            function (_global_behavior_1) {
                exports_1("GlobalBehavior", _global_behavior_1["GlobalBehavior"]);
            },
            function (_sanitize_html_1) {
                exports_1("SanitizeHtmlValueConverter", _sanitize_html_1["SanitizeHtmlValueConverter"]);
            },
            function (_replaceable_1) {
                exports_1("Replaceable", _replaceable_1["Replaceable"]);
            }],
        execute: function() {
        }
    }
});

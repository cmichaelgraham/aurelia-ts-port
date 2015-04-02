define(["require", "exports", '../templating/index'], function (require, exports, _index) {
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    var SanitizeHtmlValueConverter = (function () {
        function SanitizeHtmlValueConverter() {
            this.sanitizer = SanitizeHtmlValueConverter.defaultSanitizer;
        }
        SanitizeHtmlValueConverter.metadata = function () {
            return _index.Behavior.valueConverter('sanitizeHtml');
        };
        SanitizeHtmlValueConverter.defaultSanitizer = function (untrustedMarkup) {
            return untrustedMarkup.replace(SCRIPT_REGEX, '');
        };
        SanitizeHtmlValueConverter.prototype.toView = function (untrustedMarkup) {
            if (untrustedMarkup === null) {
                return null;
            }
            return this.sanitizer(untrustedMarkup);
        };
        return SanitizeHtmlValueConverter;
    })();
    exports.SanitizeHtmlValueConverter = SanitizeHtmlValueConverter;
});

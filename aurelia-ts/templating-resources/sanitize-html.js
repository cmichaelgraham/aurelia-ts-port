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
define(["require", "exports", '../binding/index'], function (require, exports, index_1) {
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    var SanitizeHtmlValueConverter = (function () {
        function SanitizeHtmlValueConverter() {
            this.sanitizer = SanitizeHtmlValueConverter.defaultSanitizer;
        }
        SanitizeHtmlValueConverter.defaultSanitizer = function (untrustedMarkup) {
            return untrustedMarkup.replace(SCRIPT_REGEX, '');
        };
        SanitizeHtmlValueConverter.prototype.toView = function (untrustedMarkup) {
            if (untrustedMarkup === null) {
                return null;
            }
            return this.sanitizer(untrustedMarkup);
        };
        SanitizeHtmlValueConverter = __decorate([index_1.valueConverter('sanitizeHtml')], SanitizeHtmlValueConverter);
        return SanitizeHtmlValueConverter;
    })();
    exports.SanitizeHtmlValueConverter = SanitizeHtmlValueConverter;
});

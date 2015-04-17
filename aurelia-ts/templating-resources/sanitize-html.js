var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'aurelia-binding'], function (require, exports, aurelia_binding_1) {
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
        SanitizeHtmlValueConverter = __decorate([
            aurelia_binding_1.valueConverter('sanitizeHtml')
        ], SanitizeHtmlValueConverter);
        return SanitizeHtmlValueConverter;
    })();
    exports.SanitizeHtmlValueConverter = SanitizeHtmlValueConverter;
});

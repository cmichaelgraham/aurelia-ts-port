var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports"], function (require, exports) {
    var BindingLanguage = (function () {
        function BindingLanguage() {
        }
        BindingLanguage.prototype.inspectAttribute = function (resources, attrName, attrValue) {
            throw new Error('A BindingLanguage must implement inspectAttribute(...)');
        };
        BindingLanguage.prototype.createAttributeInstruction = function (resources, element, info, existingInstruction) {
            throw new Error('A BindingLanguage must implement createAttributeInstruction(...)');
        };
        BindingLanguage.prototype.parseText = function (resources, value) {
            throw new Error('A BindingLanguage must implement parseText(...)');
        };
        return BindingLanguage;
    })();
    exports.BindingLanguage = BindingLanguage;
});

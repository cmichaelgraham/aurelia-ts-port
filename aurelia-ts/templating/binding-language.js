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

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

System.register([], function(exports_1) {
    var BindingLanguage;
    return {
        setters:[],
        execute: function() {
            BindingLanguage = (function () {
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
            exports_1("BindingLanguage", BindingLanguage);
        }
    }
});

define(["require", "exports", '../templating/index', './binding-language', './syntax-interpreter'], function (require, exports, _index, _binding_language, _syntax_interpreter) {
    function install(aurelia) {
        var instance, getInstance = function (c) {
            return instance || (instance = c.invoke(_binding_language.TemplatingBindingLanguage));
        };
        if (aurelia.container.hasHandler(_binding_language.TemplatingBindingLanguage)) {
            instance = aurelia.container.get(_binding_language.TemplatingBindingLanguage);
        }
        else {
            aurelia.container.registerHandler(_binding_language.TemplatingBindingLanguage, getInstance);
        }
        aurelia.container.registerHandler(_index.BindingLanguage, getInstance);
    }
    exports.install = install;
    exports._binding_language.TemplatingBindingLanguage = _binding_language.TemplatingBindingLanguage;
    exports._syntax_interpreter.SyntaxInterpreter = _syntax_interpreter.SyntaxInterpreter;
    exports.install = install;
});

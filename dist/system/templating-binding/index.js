System.register(['aurelia-templating', './binding-language', './binding-language', './syntax-interpreter'], function(exports_1) {
    var aurelia_templating_1, binding_language_1;
    function configure(aurelia) {
        var instance, getInstance = function (c) {
            return instance || (instance = c.invoke(binding_language_1.TemplatingBindingLanguage));
        };
        if (aurelia.container.hasHandler(binding_language_1.TemplatingBindingLanguage)) {
            instance = aurelia.container.get(binding_language_1.TemplatingBindingLanguage);
        }
        else {
            aurelia.container.registerHandler(binding_language_1.TemplatingBindingLanguage, getInstance);
        }
        aurelia.container.registerHandler(aurelia_templating_1.BindingLanguage, getInstance);
    }
    exports_1("configure", configure);
    return {
        setters:[
            function (_aurelia_templating_1) {
                aurelia_templating_1 = _aurelia_templating_1;
            },
            function (_binding_language_1) {
                binding_language_1 = _binding_language_1;
            },
            function (_binding_language_2) {
                exports_1("TemplatingBindingLanguage", _binding_language_2["TemplatingBindingLanguage"]);
            },
            function (_syntax_interpreter_1) {
                exports_1("SyntaxInterpreter", _syntax_interpreter_1["SyntaxInterpreter"]);
            }],
        execute: function() {
            ;
        }
    }
});

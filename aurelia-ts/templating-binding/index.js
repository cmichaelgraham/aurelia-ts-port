var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", '../templating/index', './binding-language', './syntax-interpreter'], function (require, exports, index_1, binding_language_1, syntax_interpreter_1) {
    exports.TemplatingBindingLanguage = binding_language_1.TemplatingBindingLanguage;
    exports.SyntaxInterpreter = syntax_interpreter_1.SyntaxInterpreter;
    function install(aurelia) {
        var instance, getInstance = function (c) {
            return instance || (instance = c.invoke(binding_language_1.TemplatingBindingLanguage));
        };
        if (aurelia.container.hasHandler(binding_language_1.TemplatingBindingLanguage)) {
            instance = aurelia.container.get(binding_language_1.TemplatingBindingLanguage);
        }
        else {
            aurelia.container.registerHandler(binding_language_1.TemplatingBindingLanguage, getInstance);
        }
        aurelia.container.registerHandler(index_1.BindingLanguage, getInstance);
    }
    exports.install = install;
});

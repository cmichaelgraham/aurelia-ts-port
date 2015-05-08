var aurelia_templating_1 = require('aurelia-templating');
var binding_language_1 = require('./binding-language');
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
exports.configure = configure;
;
var binding_language_2 = require('./binding-language');
exports.TemplatingBindingLanguage = binding_language_2.TemplatingBindingLanguage;
var syntax_interpreter_1 = require('./syntax-interpreter');
exports.SyntaxInterpreter = syntax_interpreter_1.SyntaxInterpreter;

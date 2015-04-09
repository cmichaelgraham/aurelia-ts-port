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
define(["require", "exports", './template-registry-entry', './loader'], function (require, exports, template_registry_entry_1, loader_1) {
    exports.TemplateRegistryEntry = template_registry_entry_1.TemplateRegistryEntry;
    exports.TemplateDependency = template_registry_entry_1.TemplateDependency;
    exports.Loader = loader_1.Loader;
});

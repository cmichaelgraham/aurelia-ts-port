var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", './template-registry-entry', './loader'], function (require, exports, template_registry_entry_1, loader_1) {
    exports.TemplateRegistryEntry = template_registry_entry_1.TemplateRegistryEntry;
    exports.TemplateDependency = template_registry_entry_1.TemplateDependency;
    exports.Loader = loader_1.Loader;
});

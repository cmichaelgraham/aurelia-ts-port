define(["require", "exports", './template-registry-entry', './loader'], function (require, exports, _template_registry_entry, _loader) {
    exports.TemplateRegistryEntry = _template_registry_entry.TemplateRegistryEntry;
    exports.TemplateDependency = _template_registry_entry.TemplateDependency;
    exports.Loader = _loader.Loader;
});

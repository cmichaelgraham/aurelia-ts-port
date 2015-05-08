System.register(['./template-registry-entry', './loader'], function(exports_1) {
    return {
        setters:[
            function (_template_registry_entry_1) {
                exports_1("TemplateRegistryEntry", _template_registry_entry_1["TemplateRegistryEntry"]);
                exports_1("TemplateDependency", _template_registry_entry_1["TemplateDependency"]);
            },
            function (_loader_1) {
                exports_1("Loader", _loader_1["Loader"]);
            }],
        execute: function() {
        }
    }
});

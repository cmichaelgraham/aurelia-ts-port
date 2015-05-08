System.register(['./html-behavior', './bindable-property', './resource-registry', './children', './element-config', './view-strategy', './view-compiler', './view-engine', './view-factory', './view-slot', './binding-language', './composition-engine', './animator', './decorators'], function(exports_1) {
    var exportedNames_1 = {
        'HtmlBehaviorResource': true,
        'BindableProperty': true,
        'ResourceRegistry': true,
        'ViewResources': true,
        'ChildObserver': true,
        'ElementConfigResource': true,
        'ViewStrategy': true,
        'UseViewStrategy': true,
        'ConventionalViewStrategy': true,
        'NoViewStrategy': true,
        'ViewCompiler': true,
        'ViewEngine': true,
        'ViewFactory': true,
        'BoundViewFactory': true,
        'ViewSlot': true,
        'BindingLanguage': true,
        'CompositionEngine': true,
        'Animator': true
    };
    function exportStar_1(m) {
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports_1(n, m[n]);
        }
    }
    return {
        setters:[
            function (_html_behavior_1) {
                exports_1("HtmlBehaviorResource", _html_behavior_1["HtmlBehaviorResource"]);
            },
            function (_bindable_property_1) {
                exports_1("BindableProperty", _bindable_property_1["BindableProperty"]);
            },
            function (_resource_registry_1) {
                exports_1("ResourceRegistry", _resource_registry_1["ResourceRegistry"]);
                exports_1("ViewResources", _resource_registry_1["ViewResources"]);
            },
            function (_children_1) {
                exports_1("ChildObserver", _children_1["ChildObserver"]);
            },
            function (_element_config_1) {
                exports_1("ElementConfigResource", _element_config_1["ElementConfigResource"]);
            },
            function (_view_strategy_1) {
                exports_1("ViewStrategy", _view_strategy_1["ViewStrategy"]);
                exports_1("UseViewStrategy", _view_strategy_1["UseViewStrategy"]);
                exports_1("ConventionalViewStrategy", _view_strategy_1["ConventionalViewStrategy"]);
                exports_1("NoViewStrategy", _view_strategy_1["NoViewStrategy"]);
            },
            function (_view_compiler_1) {
                exports_1("ViewCompiler", _view_compiler_1["ViewCompiler"]);
            },
            function (_view_engine_1) {
                exports_1("ViewEngine", _view_engine_1["ViewEngine"]);
            },
            function (_view_factory_1) {
                exports_1("ViewFactory", _view_factory_1["ViewFactory"]);
                exports_1("BoundViewFactory", _view_factory_1["BoundViewFactory"]);
            },
            function (_view_slot_1) {
                exports_1("ViewSlot", _view_slot_1["ViewSlot"]);
            },
            function (_binding_language_1) {
                exports_1("BindingLanguage", _binding_language_1["BindingLanguage"]);
            },
            function (_composition_engine_1) {
                exports_1("CompositionEngine", _composition_engine_1["CompositionEngine"]);
            },
            function (_animator_1) {
                exports_1("Animator", _animator_1["Animator"]);
            },
            function (_decorators_1) {
                exportStar_1(_decorators_1);
            }],
        execute: function() {
        }
    }
});

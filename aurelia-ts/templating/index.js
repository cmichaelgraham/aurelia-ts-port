var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", './html-behavior', './bindable-property', './resource-registry', './children', './element-config', './view-strategy', './view-compiler', './view-engine', './view-factory', './view-slot', './binding-language', './composition-engine', './animator', './decorators'], function (require, exports, html_behavior_1, bindable_property_1, resource_registry_1, children_1, element_config_1, view_strategy_1, view_compiler_1, view_engine_1, view_factory_1, view_slot_1, binding_language_1, composition_engine_1, animator_1, decorators_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.HtmlBehaviorResource = html_behavior_1.HtmlBehaviorResource;
    exports.BindableProperty = bindable_property_1.BindableProperty;
    exports.ResourceRegistry = resource_registry_1.ResourceRegistry;
    exports.ViewResources = resource_registry_1.ViewResources;
    exports.ChildObserver = children_1.ChildObserver;
    exports.ElementConfigResource = element_config_1.ElementConfigResource;
    exports.ViewStrategy = view_strategy_1.ViewStrategy;
    exports.UseViewStrategy = view_strategy_1.UseViewStrategy;
    exports.ConventionalViewStrategy = view_strategy_1.ConventionalViewStrategy;
    exports.NoViewStrategy = view_strategy_1.NoViewStrategy;
    exports.ViewCompiler = view_compiler_1.ViewCompiler;
    exports.ViewEngine = view_engine_1.ViewEngine;
    exports.ViewFactory = view_factory_1.ViewFactory;
    exports.BoundViewFactory = view_factory_1.BoundViewFactory;
    exports.ViewSlot = view_slot_1.ViewSlot;
    exports.BindingLanguage = binding_language_1.BindingLanguage;
    exports.CompositionEngine = composition_engine_1.CompositionEngine;
    exports.Animator = animator_1.Animator;
    __export(decorators_1);
});

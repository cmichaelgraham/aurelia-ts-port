define(["require", "exports", '../metadata/index', './bindable-property', './children', './element-config', './view-strategy', './html-behavior'], function (require, exports, index_1, bindable_property_1, children_1, element_config_1, view_strategy_1, html_behavior_1) {
    function behavior(override) {
        return function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            Object.assign(resource, override);
            return target;
        };
    }
    exports.behavior = behavior;
    index_1.Decorators.configure.parameterizedDecorator('behavior', behavior);
    function customElement(name) {
        return function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.elementName = name;
            return target;
        };
    }
    exports.customElement = customElement;
    index_1.Decorators.configure.parameterizedDecorator('customElement', customElement);
    function customAttribute(name) {
        return function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.attributeName = name;
            return target;
        };
    }
    exports.customAttribute = customAttribute;
    index_1.Decorators.configure.parameterizedDecorator('customAttribute', customAttribute);
    function templateController(target) {
        var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
        resource.liftsContent = true;
        return target;
    }
    exports.templateController = templateController;
    index_1.Decorators.configure.simpleDecorator('templateController', templateController);
    function bindableProperty(nameOrConfig) {
        return function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource), prop = new bindable_property_1.BindableProperty(nameOrConfig);
            prop.registerWith(target, resource);
            return target;
        };
    }
    exports.bindableProperty = bindableProperty;
    index_1.Decorators.configure.parameterizedDecorator('bindableProperty', bindableProperty);
    function dynamicOptions(target) {
        var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
        resource.hasDynamicOptions = true;
        return target;
    }
    exports.dynamicOptions = dynamicOptions;
    index_1.Decorators.configure.simpleDecorator('dynamicOptions', dynamicOptions);
    function syncChildren(property, changeHandler, selector) {
        return function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.childExpression = new children_1.ChildObserver(property, changeHandler, selector);
            return target;
        };
    }
    exports.syncChildren = syncChildren;
    index_1.Decorators.configure.parameterizedDecorator('syncChildren', syncChildren);
    function useShadowDOM(target) {
        var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
        resource.useShadowDOM = true;
        return target;
    }
    exports.useShadowDOM = useShadowDOM;
    index_1.Decorators.configure.simpleDecorator('useShadowDOM', useShadowDOM);
    function skipContentProcessing(target) {
        var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
        resource.skipContentProcessing = true;
        return target;
    }
    exports.skipContentProcessing = skipContentProcessing;
    index_1.Decorators.configure.simpleDecorator('skipContentProcessing', skipContentProcessing);
    function useView(path) {
        return function (target) {
            index_1.Metadata.on(target).add(new view_strategy_1.UseViewStrategy(path));
            return target;
        };
    }
    exports.useView = useView;
    index_1.Decorators.configure.parameterizedDecorator('useView', useView);
    function noView(target) {
        index_1.Metadata.on(target).add(new view_strategy_1.NoViewStrategy());
        return target;
    }
    exports.noView = noView;
    index_1.Decorators.configure.simpleDecorator('noView', noView);
    function elementConfig(target) {
        index_1.Metadata.on(target).add(new element_config_1.ElementConfigResource());
        return target;
    }
    exports.elementConfig = elementConfig;
    index_1.Decorators.configure.simpleDecorator('elementConfig', elementConfig);
});

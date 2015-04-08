define(["require", "exports", '../metadata/index', './bindable-property', './children', './element-config', './view-strategy', './html-behavior'], function (require, exports, index_1, bindable_property_1, children_1, element_config_1, view_strategy_1, html_behavior_1) {
    function behavior(override) {
        return function (target) {
            var meta = index_1.Metadata.on(target);
            if (override instanceof html_behavior_1.HtmlBehaviorResource) {
                meta.add(override);
            }
            else {
                var resource = meta.firstOrAdd(html_behavior_1.HtmlBehaviorResource);
                Object.assign(resource, override);
            }
        };
    }
    exports.behavior = behavior;
    index_1.Decorators.configure.parameterizedDecorator('behavior', behavior);
    function customElement(name) {
        return function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.elementName = name;
        };
    }
    exports.customElement = customElement;
    index_1.Decorators.configure.parameterizedDecorator('customElement', customElement);
    function customAttribute(name) {
        return function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.attributeName = name;
        };
    }
    exports.customAttribute = customAttribute;
    index_1.Decorators.configure.parameterizedDecorator('customAttribute', customAttribute);
    function templateController(target) {
        var deco = function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.liftsContent = true;
        };
        return target ? deco(target) : deco;
    }
    exports.templateController = templateController;
    index_1.Decorators.configure.simpleDecorator('templateController', templateController);
    function bindable(nameOrConfigOrTarget, key, descriptor) {
        var deco = function (target, key, descriptor) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource), prop;
            if (key) {
                nameOrConfigOrTarget = nameOrConfigOrTarget || {};
                nameOrConfigOrTarget.name = key;
            }
            prop = new bindable_property_1.BindableProperty(nameOrConfigOrTarget);
            prop.registerWith(target, resource);
        };
        if (!nameOrConfigOrTarget) {
            return deco;
        }
        if (key) {
            var target = nameOrConfigOrTarget.constructor;
            nameOrConfigOrTarget = null;
            return deco(target, key, descriptor);
        }
        return deco; //placed on a class
    }
    exports.bindable = bindable;
    index_1.Decorators.configure.parameterizedDecorator('bindable', bindable);
    function dynamicOptions(target) {
        var deco = function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.hasDynamicOptions = true;
        };
        return target ? deco(target) : deco;
    }
    exports.dynamicOptions = dynamicOptions;
    index_1.Decorators.configure.simpleDecorator('dynamicOptions', dynamicOptions);
    function syncChildren(property, changeHandler, selector) {
        return function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.childExpression = new children_1.ChildObserver(property, changeHandler, selector);
        };
    }
    exports.syncChildren = syncChildren;
    index_1.Decorators.configure.parameterizedDecorator('syncChildren', syncChildren);
    function useShadowDOM(target) {
        var deco = function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.useShadowDOM = true;
        };
        return target ? deco(target) : deco;
    }
    exports.useShadowDOM = useShadowDOM;
    index_1.Decorators.configure.simpleDecorator('useShadowDOM', useShadowDOM);
    function skipContentProcessing(target) {
        var deco = function (target) {
            var resource = index_1.Metadata.on(target).firstOrAdd(html_behavior_1.HtmlBehaviorResource);
            resource.skipContentProcessing = true;
        };
        return target ? deco(target) : deco;
    }
    exports.skipContentProcessing = skipContentProcessing;
    index_1.Decorators.configure.simpleDecorator('skipContentProcessing', skipContentProcessing);
    function useView(path) {
        return function (target) {
            index_1.Metadata.on(target).add(new view_strategy_1.UseViewStrategy(path));
        };
    }
    exports.useView = useView;
    index_1.Decorators.configure.parameterizedDecorator('useView', useView);
    function noView(target) {
        var deco = function (target) {
            index_1.Metadata.on(target).add(new view_strategy_1.NoViewStrategy());
        };
        return target ? deco(target) : deco;
    }
    exports.noView = noView;
    index_1.Decorators.configure.simpleDecorator('noView', noView);
    function elementConfig(target) {
        var deco = function (target) {
            index_1.Metadata.on(target).add(new element_config_1.ElementConfigResource());
        };
        return target ? deco(target) : deco;
    }
    exports.elementConfig = elementConfig;
    index_1.Decorators.configure.simpleDecorator('elementConfig', elementConfig);
});

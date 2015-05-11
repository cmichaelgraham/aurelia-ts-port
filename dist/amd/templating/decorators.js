define(["require", "exports", 'aurelia-metadata', './bindable-property', './children', './element-config', './view-strategy', './html-behavior'], function (require, exports, aurelia_metadata_1, bindable_property_1, children_1, element_config_1, view_strategy_1, html_behavior_1) {
    function behavior(override) {
        return function (target) {
            if (override instanceof html_behavior_1.HtmlBehaviorResource) {
                Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, override, target);
            }
            else {
                var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
                Object.assign(resource, override);
            }
        };
    }
    exports.behavior = behavior;
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('behavior', behavior);
    function customElement(name) {
        return function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.elementName = name;
        };
    }
    exports.customElement = customElement;
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('customElement', customElement);
    function customAttribute(name) {
        return function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.attributeName = name;
        };
    }
    exports.customAttribute = customAttribute;
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('customAttribute', customAttribute);
    function templateController(target) {
        var deco = function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.liftsContent = true;
        };
        return target ? deco(target) : deco;
    }
    exports.templateController = templateController;
    aurelia_metadata_1.Decorators.configure.simpleDecorator('templateController', templateController);
    function bindable(nameOrConfigOrTarget, key, descriptor) {
        var deco = function (target, key, descriptor) {
            var actualTarget = key ? target.constructor : target, resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, actualTarget), prop;
            if (key) {
                nameOrConfigOrTarget = nameOrConfigOrTarget || {};
                nameOrConfigOrTarget.name = key;
            }
            prop = new bindable_property_1.BindableProperty(nameOrConfigOrTarget);
            return prop.registerWith(actualTarget, resource, descriptor);
        };
        if (!nameOrConfigOrTarget) {
            return deco;
        }
        if (key) {
            var target = nameOrConfigOrTarget;
            nameOrConfigOrTarget = null;
            return deco(target, key, descriptor);
        }
        return deco; //placed on a class
    }
    exports.bindable = bindable;
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('bindable', bindable);
    function dynamicOptions(target) {
        var deco = function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.hasDynamicOptions = true;
        };
        return target ? deco(target) : deco;
    }
    exports.dynamicOptions = dynamicOptions;
    aurelia_metadata_1.Decorators.configure.simpleDecorator('dynamicOptions', dynamicOptions);
    function syncChildren(property, changeHandler, selector) {
        return function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.childExpression = new children_1.ChildObserver(property, changeHandler, selector);
        };
    }
    exports.syncChildren = syncChildren;
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('syncChildren', syncChildren);
    function useShadowDOM(target) {
        var deco = function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.targetShadowDOM = true;
        };
        return target ? deco(target) : deco;
    }
    exports.useShadowDOM = useShadowDOM;
    aurelia_metadata_1.Decorators.configure.simpleDecorator('useShadowDOM', useShadowDOM);
    function skipContentProcessing(target) {
        var deco = function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.skipContentProcessing = true;
        };
        return target ? deco(target) : deco;
    }
    exports.skipContentProcessing = skipContentProcessing;
    aurelia_metadata_1.Decorators.configure.simpleDecorator('skipContentProcessing', skipContentProcessing);
    function viewStrategy(strategy) {
        return function (target) {
            Reflect.defineMetadata(view_strategy_1.ViewStrategy.metadataKey, strategy, target);
        };
    }
    exports.viewStrategy = viewStrategy;
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('viewStrategy', useView);
    function useView(path) {
        return viewStrategy(new view_strategy_1.UseViewStrategy(path));
    }
    exports.useView = useView;
    aurelia_metadata_1.Decorators.configure.parameterizedDecorator('useView', useView);
    function noView(target) {
        var deco = function (target) {
            Reflect.defineMetadata(view_strategy_1.ViewStrategy.metadataKey, new view_strategy_1.NoViewStrategy(), target);
        };
        return target ? deco(target) : deco;
    }
    exports.noView = noView;
    aurelia_metadata_1.Decorators.configure.simpleDecorator('noView', noView);
    function elementConfig(target) {
        var deco = function (target) {
            Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, new element_config_1.ElementConfigResource(), target);
        };
        return target ? deco(target) : deco;
    }
    exports.elementConfig = elementConfig;
    aurelia_metadata_1.Decorators.configure.simpleDecorator('elementConfig', elementConfig);
});

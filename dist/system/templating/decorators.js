System.register(['aurelia-metadata', './bindable-property', './children', './element-config', './view-strategy', './html-behavior'], function(exports_1) {
    var aurelia_metadata_1, bindable_property_1, children_1, element_config_1, view_strategy_1, html_behavior_1;
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
    exports_1("behavior", behavior);
    function customElement(name) {
        return function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.elementName = name;
        };
    }
    exports_1("customElement", customElement);
    function customAttribute(name) {
        return function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.attributeName = name;
        };
    }
    exports_1("customAttribute", customAttribute);
    function templateController(target) {
        var deco = function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.liftsContent = true;
        };
        return target ? deco(target) : deco;
    }
    exports_1("templateController", templateController);
    function bindable(nameOrConfigOrTarget, key, descriptor) {
        var deco = function (target, key, descriptor) {
            var actualTarget = key ? target.constructor : target, resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, actualTarget), prop;
            if (key) {
                nameOrConfigOrTarget = nameOrConfigOrTarget || {};
                nameOrConfigOrTarget.name = key;
            }
            prop = new bindable_property_1.BindableProperty(nameOrConfigOrTarget);
            prop.registerWith(actualTarget, resource);
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
    exports_1("bindable", bindable);
    function dynamicOptions(target) {
        var deco = function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.hasDynamicOptions = true;
        };
        return target ? deco(target) : deco;
    }
    exports_1("dynamicOptions", dynamicOptions);
    function syncChildren(property, changeHandler, selector) {
        return function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.childExpression = new children_1.ChildObserver(property, changeHandler, selector);
        };
    }
    exports_1("syncChildren", syncChildren);
    function useShadowDOM(target) {
        var deco = function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.targetShadowDOM = true;
        };
        return target ? deco(target) : deco;
    }
    exports_1("useShadowDOM", useShadowDOM);
    function skipContentProcessing(target) {
        var deco = function (target) {
            var resource = aurelia_metadata_1.Metadata.getOrCreateOwn(aurelia_metadata_1.Metadata.resource, html_behavior_1.HtmlBehaviorResource, target);
            resource.skipContentProcessing = true;
        };
        return target ? deco(target) : deco;
    }
    exports_1("skipContentProcessing", skipContentProcessing);
    function viewStrategy(strategy) {
        return function (target) {
            Reflect.defineMetadata(view_strategy_1.ViewStrategy.metadataKey, strategy, target);
        };
    }
    exports_1("viewStrategy", viewStrategy);
    function useView(path) {
        return viewStrategy(new view_strategy_1.UseViewStrategy(path));
    }
    exports_1("useView", useView);
    function noView(target) {
        var deco = function (target) {
            Reflect.defineMetadata(view_strategy_1.ViewStrategy.metadataKey, new view_strategy_1.NoViewStrategy(), target);
        };
        return target ? deco(target) : deco;
    }
    exports_1("noView", noView);
    function elementConfig(target) {
        var deco = function (target) {
            Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, new element_config_1.ElementConfigResource(), target);
        };
        return target ? deco(target) : deco;
    }
    exports_1("elementConfig", elementConfig);
    return {
        setters:[
            function (_aurelia_metadata_1) {
                aurelia_metadata_1 = _aurelia_metadata_1;
            },
            function (_bindable_property_1) {
                bindable_property_1 = _bindable_property_1;
            },
            function (_children_1) {
                children_1 = _children_1;
            },
            function (_element_config_1) {
                element_config_1 = _element_config_1;
            },
            function (_view_strategy_1) {
                view_strategy_1 = _view_strategy_1;
            },
            function (_html_behavior_1) {
                html_behavior_1 = _html_behavior_1;
            }],
        execute: function() {
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('behavior', behavior);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('customElement', customElement);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('customAttribute', customAttribute);
            aurelia_metadata_1.Decorators.configure.simpleDecorator('templateController', templateController);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('bindable', bindable);
            aurelia_metadata_1.Decorators.configure.simpleDecorator('dynamicOptions', dynamicOptions);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('syncChildren', syncChildren);
            aurelia_metadata_1.Decorators.configure.simpleDecorator('useShadowDOM', useShadowDOM);
            aurelia_metadata_1.Decorators.configure.simpleDecorator('skipContentProcessing', skipContentProcessing);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('viewStrategy', useView);
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('useView', useView);
            aurelia_metadata_1.Decorators.configure.simpleDecorator('noView', noView);
            aurelia_metadata_1.Decorators.configure.simpleDecorator('elementConfig', elementConfig);
        }
    }
});

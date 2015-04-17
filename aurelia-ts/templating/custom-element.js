var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'aurelia-metadata', './behavior-instance', './behaviors', './content-selector', './view-engine', './view-strategy', './util'], function (require, exports, aurelia_metadata_1, behavior_instance_1, behaviors_1, content_selector_1, view_engine_1, view_strategy_1, util_1) {
    var defaultInstruction = { suppressBind: false }, contentSelectorFactoryOptions = { suppressBind: true }, hasShadowDOM = !!HTMLElement.prototype.createShadowRoot, valuePropertyName = 'value';
    var UseShadowDOM = (function () {
        function UseShadowDOM() {
        }
        return UseShadowDOM;
    })();
    exports.UseShadowDOM = UseShadowDOM;
    var SkipContentProcessing = (function () {
        function SkipContentProcessing() {
        }
        return SkipContentProcessing;
    })();
    exports.SkipContentProcessing = SkipContentProcessing;
    var CustomElement = (function (_super) {
        __extends(CustomElement, _super);
        function CustomElement(tagName) {
            _super.call(this);
            this.name = tagName;
            this.properties = [];
            this.attributes = {};
        }
        CustomElement.convention = function (name) {
            if (name.endsWith('CustomElement')) {
                return new CustomElement(util_1.hyphenate(name.substring(0, name.length - 13)));
            }
        };
        CustomElement.prototype.analyze = function (container, target) {
            var meta = aurelia_metadata_1.Metadata.on(target);
            behaviors_1.configureBehavior(container, this, target, valuePropertyName);
            this.targetShadowDOM = meta.has(UseShadowDOM);
            this.skipContentProcessing = meta.has(SkipContentProcessing);
            this.usesShadowDOM = this.targetShadowDOM && hasShadowDOM;
        };
        CustomElement.prototype.register = function (registry, name) {
            registry.registerElement(name || this.name, this);
        };
        CustomElement.prototype.load = function (container, target, viewStrategy, transientView) {
            var _this = this;
            var options;
            viewStrategy = viewStrategy || this.viewStrategy || view_strategy_1.ViewStrategy.getDefault(target);
            options = {
                targetShadowDOM: this.targetShadowDOM,
                beforeCompile: target.beforeCompile
            };
            if (!viewStrategy.moduleId) {
                viewStrategy.moduleId = aurelia_metadata_1.Origin.get(target).moduleId;
            }
            return viewStrategy.loadViewFactory(container.get(view_engine_1.ViewEngine), options).then(function (viewFactory) {
                if (!transientView) {
                    _this.viewFactory = viewFactory;
                }
                return viewFactory;
            });
        };
        CustomElement.prototype.compile = function (compiler, resources, node, instruction) {
            if (!this.usesShadowDOM && !this.skipContentProcessing && node.hasChildNodes()) {
                var fragment = document.createDocumentFragment(), currentChild = node.firstChild, nextSibling;
                while (currentChild) {
                    nextSibling = currentChild.nextSibling;
                    fragment.appendChild(currentChild);
                    currentChild = nextSibling;
                }
                instruction.contentFactory = compiler.compile(fragment, resources);
            }
            instruction.suppressBind = true;
            return node;
        };
        CustomElement.prototype.create = function (container, instruction, element) {
            if (instruction === void 0) { instruction = defaultInstruction; }
            if (element === void 0) { element = null; }
            var executionContext = instruction.executionContext || container.get(this.target), behaviorInstance = new behavior_instance_1.BehaviorInstance(this, executionContext, instruction), viewFactory = instruction.viewFactory || this.viewFactory, host;
            if (viewFactory) {
                behaviorInstance.view = viewFactory.create(container, behaviorInstance.executionContext, instruction);
            }
            if (element) {
                element.primaryBehavior = behaviorInstance;
                if (!(this.apiName in element)) {
                    element[this.apiName] = behaviorInstance.executionContext;
                }
                if (behaviorInstance.view) {
                    if (this.usesShadowDOM) {
                        host = element.createShadowRoot();
                    }
                    else {
                        host = element;
                        if (instruction.contentFactory) {
                            var contentView = instruction.contentFactory.create(container, null, contentSelectorFactoryOptions);
                            content_selector_1.ContentSelector.applySelectors(contentView, behaviorInstance.view.contentSelectors, function (contentSelector, group) { return contentSelector.add(group); });
                            behaviorInstance.contentView = contentView;
                        }
                    }
                    if (this.childExpression) {
                        behaviorInstance.view.addBinding(this.childExpression.createBinding(host, behaviorInstance.executionContext));
                    }
                    behaviorInstance.view.appendNodesTo(host);
                }
            }
            else if (behaviorInstance.view) {
                behaviorInstance.view.owner = behaviorInstance;
            }
            return behaviorInstance;
        };
        return CustomElement;
    })(ResourceType);
    exports.CustomElement = CustomElement;
});

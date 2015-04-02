var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../metadata/index', './behavior-instance', './behaviors', './content-selector', './view-engine', './view-strategy', './util'], function (require, exports, _index, _behavior_instance, _behaviors, _content_selector, _view_engine, _view_strategy, _util) {
    var defaultInstruction = {
        suppressBind: false
    }, contentSelectorFactoryOptions = {
        suppressBind: true
    }, hasShadowDOM = !!HTMLElement.prototype.createShadowRoot, valuePropertyName = 'value';
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
            this.name = tagName;
            this.properties = [];
            this.attributes = {};
        }
        CustomElement.convention = function (name) {
            if (name.endsWith('CustomElement')) {
                return new CustomElement(_util.hyphenate(name.substring(0, name.length - 13)));
            }
        };
        CustomElement.prototype.analyze = function (container, target) {
            var meta = _index.Metadata.on(target);
            _behaviors.configureBehavior(container, this, target, valuePropertyName);
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
            viewStrategy = viewStrategy || this.viewStrategy || _view_strategy.ViewStrategy.getDefault(target);
            options = {
                targetShadowDOM: this.targetShadowDOM,
                beforeCompile: target.beforeCompile
            };
            if (!viewStrategy.moduleId) {
                viewStrategy.moduleId = _index.Origin.get(target).moduleId;
            }
            return viewStrategy.loadViewFactory(container.get(_view_engine.ViewEngine), options).then(function (viewFactory) {
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
            var executionContext = instruction.executionContext || container.get(this.target), behaviorInstance = new _behavior_instance.BehaviorInstance(this, executionContext, instruction), viewFactory = instruction.viewFactory || this.viewFactory, host;
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
                            _content_selector.ContentSelector.applySelectors(contentView, behaviorInstance.view.contentSelectors, function (contentSelector, group) {
                                return contentSelector.add(group);
                            });
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
    })(_index.ResourceType);
    exports.CustomElement = CustomElement;
});

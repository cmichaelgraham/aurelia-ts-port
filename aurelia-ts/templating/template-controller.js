var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../metadata/index', './behavior-instance', './behaviors', './util'], function (require, exports, _index, _behavior_instance, _behaviors, _util) {
    var TemplateController = (function (_super) {
        __extends(TemplateController, _super);
        function TemplateController(attribute) {
            this.name = attribute;
            this.properties = [];
            this.attributes = {};
            this.liftsContent = true;
        }
        TemplateController.convention = function (name) {
            if (name.endsWith('TemplateController')) {
                return new TemplateController(_util.hyphenate(name.substring(0, name.length - 18)));
            }
        };
        TemplateController.prototype.analyze = function (container, target) {
            _behaviors.configureBehavior(container, this, target);
        };
        TemplateController.prototype.load = function (container, target) {
            return Promise.resolve(this);
        };
        TemplateController.prototype.register = function (registry, name) {
            registry.registerAttribute(name || this.name, this, this.name);
        };
        TemplateController.prototype.compile = function (compiler, resources, node, instruction, parentNode) {
            if (!instruction.viewFactory) {
                var template = document.createElement('template'), fragment = document.createDocumentFragment();
                node.removeAttribute(instruction.originalAttrName);
                if (node.parentNode) {
                    node.parentNode.replaceChild(template, node);
                }
                else if (window.ShadowDOMPolyfill) {
                    ShadowDOMPolyfill.unwrap(parentNode).replaceChild(ShadowDOMPolyfill.unwrap(template), ShadowDOMPolyfill.unwrap(node));
                }
                else {
                    parentNode.replaceChild(template, node);
                }
                fragment.appendChild(node);
                instruction.viewFactory = compiler.compile(fragment, resources);
                node = template;
            }
            instruction.suppressBind = true;
            return node;
        };
        TemplateController.prototype.create = function (container, instruction, element) {
            var executionContext = instruction.executionContext || container.get(this.target), behaviorInstance = new _behavior_instance.BehaviorInstance(this, executionContext, instruction);
            element.primaryBehavior = behaviorInstance;
            if (!(this.apiName in element)) {
                element[this.apiName] = behaviorInstance.executionContext;
            }
            return behaviorInstance;
        };
        return TemplateController;
    })(_index.ResourceType);
    exports.TemplateController = TemplateController;
});

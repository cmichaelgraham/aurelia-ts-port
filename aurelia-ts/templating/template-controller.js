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
define(["require", "exports", 'aurelia-metadata', './behavior-instance', './behaviors', './util'], function (require, exports, aurelia_metadata_1, behavior_instance_1, behaviors_1, util_1) {
    var TemplateController = (function (_super) {
        __extends(TemplateController, _super);
        function TemplateController(attribute) {
            _super.call(this);
            this.name = attribute;
            this.properties = [];
            this.attributes = {};
            this.liftsContent = true;
        }
        TemplateController.convention = function (name) {
            if (name.endsWith('TemplateController')) {
                return new TemplateController(util_1.hyphenate(name.substring(0, name.length - 18)));
            }
        };
        TemplateController.prototype.analyze = function (container, target) {
            behaviors_1.configureBehavior(container, this, target);
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
                    window.ShadowDOMPolyfill.unwrap(parentNode).replaceChild(window.ShadowDOMPolyfill.unwrap(template), window.ShadowDOMPolyfill.unwrap(node));
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
            var executionContext = instruction.executionContext || container.get(this.target), behaviorInstance = new behavior_instance_1.BehaviorInstance(this, executionContext, instruction);
            element.primaryBehavior = behaviorInstance;
            if (!(this.apiName in element)) {
                element[this.apiName] = behaviorInstance.executionContext;
            }
            return behaviorInstance;
        };
        return TemplateController;
    })(aurelia_metadata_1.ResourceType);
    exports.TemplateController = TemplateController;
});

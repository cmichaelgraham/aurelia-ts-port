var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../metadata/index', './behavior-instance', './behaviors', './util'], function (require, exports, _index, _behavior_instance, _behaviors, _util) {
    var AttachedBehavior = (function (_super) {
        __extends(AttachedBehavior, _super);
        function AttachedBehavior(attribute) {
            this.name = attribute;
            this.properties = [];
            this.attributes = {};
        }
        AttachedBehavior.convention = function (name) {
            if (name.endsWith('AttachedBehavior')) {
                return new AttachedBehavior(_util.hyphenate(name.substring(0, name.length - 16)));
            }
        };
        AttachedBehavior.prototype.analyze = function (container, target) {
            _behaviors.configureBehavior(container, this, target);
        };
        AttachedBehavior.prototype.load = function (container, target) {
            return Promise.resolve(this);
        };
        AttachedBehavior.prototype.register = function (registry, name) {
            registry.registerAttribute(name || this.name, this, this.name);
        };
        AttachedBehavior.prototype.compile = function (compiler, resources, node, instruction) {
            instruction.suppressBind = true;
            return node;
        };
        AttachedBehavior.prototype.create = function (container, instruction, element, bindings) {
            var executionContext = instruction.executionContext || container.get(this.target), behaviorInstance = new _behavior_instance.BehaviorInstance(this, executionContext, instruction);
            if (!(this.apiName in element)) {
                element[this.apiName] = behaviorInstance.executionContext;
            }
            if (this.childExpression) {
                bindings.push(this.childExpression.createBinding(element, behaviorInstance.executionContext));
            }
            return behaviorInstance;
        };
        return AttachedBehavior;
    })(_index.ResourceType);
    exports.AttachedBehavior = AttachedBehavior;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", '../metadata/index', './behavior-instance', './behaviors', './util'], function (require, exports, index_1, behavior_instance_1, behaviors_1, util_1) {
    var AttachedBehavior = (function (_super) {
        __extends(AttachedBehavior, _super);
        function AttachedBehavior(attribute) {
            _super.call(this);
            this.name = attribute;
            this.properties = [];
            this.attributes = {};
        }
        AttachedBehavior.convention = function (name) {
            if (name.endsWith('AttachedBehavior')) {
                return new AttachedBehavior(util_1.hyphenate(name.substring(0, name.length - 16)));
            }
        };
        AttachedBehavior.prototype.analyze = function (container, target) {
            behaviors_1.configureBehavior(container, this, target);
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
            var executionContext = instruction.executionContext || container.get(this.target), behaviorInstance = new behavior_instance_1.BehaviorInstance(this, executionContext, instruction);
            if (!(this.apiName in element)) {
                element[this.apiName] = behaviorInstance.executionContext;
            }
            if (this.childExpression) {
                bindings.push(this.childExpression.createBinding(element, behaviorInstance.executionContext));
            }
            return behaviorInstance;
        };
        return AttachedBehavior;
    })(index_1.ResourceType);
    exports.AttachedBehavior = AttachedBehavior;
});

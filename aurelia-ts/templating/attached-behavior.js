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
    })(aurelia_metadata_1.ResourceType);
    exports.AttachedBehavior = AttachedBehavior;
});

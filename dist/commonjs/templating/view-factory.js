var view_1 = require('./view');
var view_slot_1 = require('./view-slot');
var content_selector_1 = require('./content-selector');
var resource_registry_1 = require('./resource-registry');
function elementContainerGet(key) {
    if (key === Element) {
        return this.element;
    }
    if (key === BoundViewFactory) {
        if (this.boundViewFactory) {
            return this.boundViewFactory;
        }
        var factory = this.instruction.viewFactory, partReplacements = this.partReplacements;
        if (partReplacements) {
            factory = partReplacements[factory.part] || factory;
        }
        factory.partReplacements = partReplacements;
        return this.boundViewFactory = new BoundViewFactory(this, factory, this.executionContext);
    }
    if (key === view_slot_1.ViewSlot) {
        if (this.viewSlot === undefined) {
            this.viewSlot = new view_slot_1.ViewSlot(this.element, this.instruction.anchorIsContainer, this.executionContext);
            this.children.push(this.viewSlot);
        }
        return this.viewSlot;
    }
    if (key === resource_registry_1.ViewResources) {
        return this.viewResources;
    }
    return this.superGet(key);
}
function createElementContainer(parent, element, instruction, executionContext, children, partReplacements, resources) {
    var container = parent.createChild(), providers, i;
    container.element = element;
    container.instruction = instruction;
    container.executionContext = executionContext;
    container.children = children;
    container.viewResources = resources;
    container.partReplacements = partReplacements;
    providers = instruction.providers;
    i = providers.length;
    while (i--) {
        container.registerSingleton(providers[i]);
    }
    container.superGet = container.get;
    container.get = elementContainerGet;
    return container;
}
function applyInstructions(containers, executionContext, element, instruction, behaviors, bindings, children, contentSelectors, partReplacements, resources) {
    var behaviorInstructions = instruction.behaviorInstructions, expressions = instruction.expressions, elementContainer, i, ii, current, instance;
    if (instruction.contentExpression) {
        bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
        element.parentNode.removeChild(element);
        return;
    }
    if (instruction.contentSelector) {
        contentSelectors.push(new content_selector_1.ContentSelector(element, instruction.selector));
        return;
    }
    if (behaviorInstructions.length) {
        containers[instruction.injectorId] = elementContainer =
            createElementContainer(containers[instruction.parentInjectorId], element, instruction, executionContext, children, partReplacements, resources);
        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
            current = behaviorInstructions[i];
            instance = current.type.create(elementContainer, current, element, bindings, current.partReplacements);
            if (instance.contentView) {
                children.push(instance.contentView);
            }
            behaviors.push(instance);
        }
    }
    for (i = 0, ii = expressions.length; i < ii; ++i) {
        bindings.push(expressions[i].createBinding(element));
    }
}
var BoundViewFactory = (function () {
    function BoundViewFactory(parentContainer, viewFactory, executionContext) {
        this.parentContainer = parentContainer;
        this.viewFactory = viewFactory;
        this.executionContext = executionContext;
        this.factoryOptions = { behaviorInstance: false };
    }
    BoundViewFactory.prototype.create = function (executionContext) {
        var childContainer = this.parentContainer.createChild(), context = executionContext || this.executionContext;
        this.factoryOptions.systemControlled = !executionContext;
        return this.viewFactory.create(childContainer, context, this.factoryOptions);
    };
    return BoundViewFactory;
})();
exports.BoundViewFactory = BoundViewFactory;
var defaultFactoryOptions = {
    systemControlled: false,
    suppressBind: false
};
var ViewFactory = (function () {
    function ViewFactory(template, instructions, resources) {
        this.template = template;
        this.instructions = instructions;
        this.resources = resources;
    }
    ViewFactory.prototype.create = function (container, executionContext, options) {
        if (options === void 0) { options = defaultFactoryOptions; }
        var fragment = this.template.cloneNode(true), instructables = fragment.querySelectorAll('.au-target'), instructions = this.instructions, resources = this.resources, behaviors = [], bindings = [], children = [], contentSelectors = [], containers = { root: container }, partReplacements = options.partReplacements || this.partReplacements, i, ii, view;
        for (i = 0, ii = instructables.length; i < ii; ++i) {
            applyInstructions(containers, executionContext, instructables[i], instructions[i], behaviors, bindings, children, contentSelectors, partReplacements, resources);
        }
        view = new view_1.View(fragment, behaviors, bindings, children, options.systemControlled, contentSelectors);
        view.created(executionContext);
        if (!options.suppressBind) {
            view.bind(executionContext);
        }
        return view;
    };
    return ViewFactory;
})();
exports.ViewFactory = ViewFactory;

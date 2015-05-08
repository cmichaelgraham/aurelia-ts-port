var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_dependency_injection_1 = require('aurelia-dependency-injection');
var aurelia_templating_1 = require('aurelia-templating');
var aurelia_router_1 = require('aurelia-router');
var aurelia_metadata_1 = require('aurelia-metadata');
var RouterView = (function () {
    function RouterView(element, container, viewSlot, router) {
        this.element = element;
        this.container = container;
        this.viewSlot = viewSlot;
        this.router = router;
        this.router.registerViewPort(this, this.element.getAttribute('name'));
    }
    RouterView.prototype.bind = function (executionContext) {
        this.container.viewModel = executionContext;
    };
    RouterView.prototype.process = function (viewPortInstruction, waitToSwap) {
        var _this = this;
        var component = viewPortInstruction.component, viewStrategy = component.view, childContainer = component.childContainer, viewModel = component.executionContext, viewModelResource = component.viewModelResource, metadata = viewModelResource.metadata;
        if (!viewStrategy && 'getViewStrategy' in viewModel) {
            viewStrategy = viewModel.getViewStrategy();
        }
        if (viewStrategy) {
            viewStrategy = aurelia_templating_1.ViewStrategy.normalize(viewStrategy);
            viewStrategy.makeRelativeTo((aurelia_metadata_1.Origin.get(component.router.container.viewModel.constructor)).moduleId);
        }
        return metadata.load(childContainer, viewModelResource.value, viewStrategy, true).then(function (viewFactory) {
            viewPortInstruction.behavior = metadata.create(childContainer, {
                executionContext: viewModel,
                viewFactory: viewFactory,
                suppressBind: true
            });
            if (waitToSwap) {
                return;
            }
            _this.swap(viewPortInstruction);
        });
    };
    RouterView.prototype.swap = function (viewPortInstruction) {
        viewPortInstruction.behavior.view.bind(viewPortInstruction.behavior.executionContext);
        this.viewSlot.swap(viewPortInstruction.behavior.view);
        if (this.view) {
            this.view.unbind();
        }
        this.view = viewPortInstruction.behavior.view;
    };
    RouterView = __decorate([
        aurelia_templating_1.customElement('router-view'),
        aurelia_templating_1.noView,
        aurelia_dependency_injection_1.inject(Element, aurelia_dependency_injection_1.Container, aurelia_templating_1.ViewSlot, aurelia_router_1.Router), 
        __metadata('design:paramtypes', [Object, Object, Object, Object])
    ], RouterView);
    return RouterView;
})();
exports.RouterView = RouterView;

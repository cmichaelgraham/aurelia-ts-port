var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-router', 'aurelia-metadata'], function (require, exports, aurelia_dependency_injection_1, aurelia_templating_1, aurelia_router_1, aurelia_metadata_1) {
    var RouterView = (function () {
        function RouterView(element, container, viewSlot, router) {
            this.element = element;
            this.container = container;
            this.viewSlot = viewSlot;
            this.router = router;
            router.registerViewPort(this, element.getAttribute('name'));
        }
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
            aurelia_dependency_injection_1.inject(Element, aurelia_dependency_injection_1.Container, aurelia_templating_1.ViewSlot, aurelia_router_1.Router)
        ], RouterView);
        return RouterView;
    })();
    exports.RouterView = RouterView;
});

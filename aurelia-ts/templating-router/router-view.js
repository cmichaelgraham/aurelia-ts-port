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
define(["require", "exports", '../dependency-injection/index', '../templating/index', '../router/index', '../metadata/index'], function (require, exports, index_1, index_2, index_3, index_4) {
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
                viewStrategy = index_2.ViewStrategy.normalize(viewStrategy);
                viewStrategy.makeRelativeTo(index_4.Origin.get(component.router.container.viewModel.constructor).moduleId);
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
        RouterView = __decorate([index_2.customElement('router-view'), index_2.noView, index_1.inject(Element, index_1.Container, index_2.ViewSlot, index_3.Router)], RouterView);
        return RouterView;
    })();
    exports.RouterView = RouterView;
});

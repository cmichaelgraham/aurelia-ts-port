define(["require", "exports", '../dependency-injection/index', '../templating/index', '../router/index', '../metadata/index'], function (require, exports, _index, _index_1, _index_2, _index_3) {
    var RouterView = (function () {
        function RouterView(element, container, viewSlot, router) {
            this.element = element;
            this.container = container;
            this.viewSlot = viewSlot;
            this.router = router;
            router.registerViewPort(this, element.getAttribute('name'));
        }
        RouterView.metadata = function () {
            return _index_3.Metadata.customElement('router-view').noView();
        };
        RouterView.inject = function () {
            return [
                Element,
                _index.Container,
                _index_1.ViewSlot,
                _index_2.Router
            ];
        };
        RouterView.prototype.process = function (viewPortInstruction, waitToSwap) {
            var _this = this;
            var component = viewPortInstruction.component, viewStrategy = component.view, childContainer = component.childContainer, viewModel = component.executionContext, viewModelResource = component.viewModelResource, metadata = viewModelResource.metadata;
            if (!viewStrategy && 'getViewStrategy' in viewModel) {
                viewStrategy = viewModel.getViewStrategy();
            }
            if (viewStrategy) {
                viewStrategy = _index_1.ViewStrategy.normalize(viewStrategy);
                viewStrategy.makeRelativeTo(_index_3.Origin.get(component.router.container.viewModel.constructor).moduleId);
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
        return RouterView;
    })();
    exports.RouterView = RouterView;
});

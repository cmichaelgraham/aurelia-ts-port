define(["require", "exports", '../dependency-injection/index', '../templating/index'], function (require, exports, _index, _index_1) {
    var Compose = (function () {
        function Compose(container, compositionEngine, viewSlot, viewResources) {
            this.container = container;
            this.compositionEngine = compositionEngine;
            this.viewSlot = viewSlot;
            this.viewResources = viewResources;
        }
        Compose.metadata = function () {
            return _index_1.Behavior.customElement('compose').withProperty('model').withProperty('view').withProperty('viewModel').noView();
        };
        Compose.inject = function () {
            return [
                _index.Container,
                _index_1.CompositionEngine,
                _index_1.ViewSlot,
                _index_1.ViewResources
            ];
        };
        Compose.prototype.bind = function (executionContext) {
            this.executionContext = executionContext;
            processInstruction(this, {
                view: this.view,
                viewModel: this.viewModel,
                model: this.model
            });
        };
        Compose.prototype.modelChanged = function (newValue, oldValue) {
            var vm = this.currentViewModel;
            if (vm && typeof vm.activate === 'function') {
                vm.activate(newValue);
            }
        };
        Compose.prototype.viewChanged = function (newValue, oldValue) {
            processInstruction(this, {
                view: newValue,
                viewModel: this.currentViewModel || this.viewModel,
                model: this.model
            });
        };
        Compose.prototype.viewModelChanged = function (newValue, oldValue) {
            processInstruction(this, {
                viewModel: newValue,
                view: this.view,
                model: this.model
            });
        };
        return Compose;
    })();
    exports.Compose = Compose;
    function processInstruction(composer, instruction) {
        composer.compositionEngine.compose(Object.assign(instruction, {
            executionContext: composer.executionContext,
            container: composer.container,
            viewSlot: composer.viewSlot,
            viewResources: composer.viewResources,
            currentBehavior: composer.currentBehavior
        })).then(function (next) {
            composer.currentBehavior = next;
            composer.currentViewModel = next ? next.executionContext : null;
        });
    }
});

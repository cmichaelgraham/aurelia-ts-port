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
define(["require", "exports", '../dependency-injection/index', '../templating/index'], function (require, exports, index_1, index_2) {
    var Compose = (function () {
        function Compose(container, compositionEngine, viewSlot, viewResources) {
            this.container = container;
            this.compositionEngine = compositionEngine;
            this.viewSlot = viewSlot;
            this.viewResources = viewResources;
        }
        Compose.prototype.bind = function (executionContext) {
            this.executionContext = executionContext;
            processInstruction(this, { view: this.view, viewModel: this.viewModel, model: this.model });
        };
        Compose.prototype.modelChanged = function (newValue, oldValue) {
            var vm = this.currentViewModel;
            if (vm && typeof vm.activate === 'function') {
                vm.activate(newValue);
            }
        };
        Compose.prototype.viewChanged = function (newValue, oldValue) {
            processInstruction(this, { view: newValue, viewModel: this.currentViewModel || this.viewModel, model: this.model });
        };
        Compose.prototype.viewModelChanged = function (newValue, oldValue) {
            processInstruction(this, { viewModel: newValue, view: this.view, model: this.model });
        };
        Compose = __decorate([index_2.customElement('compose'), index_2.bindableProperty('model'), index_2.bindableProperty('view'), index_2.bindableProperty('viewModel'), index_2.noView, index_1.inject(index_1.Container, index_2.CompositionEngine, index_2.ViewSlot, index_2.ViewResources)], Compose);
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

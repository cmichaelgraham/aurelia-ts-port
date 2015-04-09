var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
        Compose = __decorate([
            index_2.customElement('compose'),
            index_2.bindable('model'),
            index_2.bindable('view'),
            index_2.bindable('viewModel'),
            index_2.noView,
            index_1.inject(index_1.Container, index_2.CompositionEngine, index_2.ViewSlot, index_2.ViewResources)
        ], Compose);
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

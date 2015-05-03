if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-templating'], function (require, exports, aurelia_dependency_injection_1, aurelia_templating_1) {
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
            aurelia_templating_1.customElement('compose'),
            aurelia_templating_1.bindable('model'),
            aurelia_templating_1.bindable('view'),
            aurelia_templating_1.bindable('viewModel'),
            aurelia_templating_1.noView,
            aurelia_dependency_injection_1.inject(aurelia_dependency_injection_1.Container, aurelia_templating_1.CompositionEngine, aurelia_templating_1.ViewSlot, aurelia_templating_1.ViewResources), 
            __metadata('design:paramtypes', [Object, Object, Object, Object])
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

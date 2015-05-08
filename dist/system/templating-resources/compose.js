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
import { Container, inject } from 'aurelia-dependency-injection';
import { CompositionEngine, ViewSlot, ViewResources, customElement, bindable, noView } from 'aurelia-templating';
export let Compose = class {
    constructor(container, compositionEngine, viewSlot, viewResources) {
        this.container = container;
        this.compositionEngine = compositionEngine;
        this.viewSlot = viewSlot;
        this.viewResources = viewResources;
    }
    bind(executionContext) {
        this.executionContext = executionContext;
        processInstruction(this, { view: this.view, viewModel: this.viewModel, model: this.model });
    }
    modelChanged(newValue, oldValue) {
        var vm = this.currentViewModel;
        if (vm && typeof vm.activate === 'function') {
            vm.activate(newValue);
        }
    }
    viewChanged(newValue, oldValue) {
        processInstruction(this, { view: newValue, viewModel: this.currentViewModel || this.viewModel, model: this.model });
    }
    viewModelChanged(newValue, oldValue) {
        processInstruction(this, { viewModel: newValue, view: this.view, model: this.model });
    }
};
Compose = __decorate([
    customElement('compose'),
    bindable('model'),
    bindable('view'),
    bindable('viewModel'),
    noView,
    inject(Container, CompositionEngine, ViewSlot, ViewResources), 
    __metadata('design:paramtypes', [Object, Object, Object, Object])
], Compose);
function processInstruction(composer, instruction) {
    composer.compositionEngine.compose(Object.assign(instruction, {
        executionContext: composer.executionContext,
        container: composer.container,
        viewSlot: composer.viewSlot,
        viewResources: composer.viewResources,
        currentBehavior: composer.currentBehavior
    })).then(next => {
        composer.currentBehavior = next;
        composer.currentViewModel = next ? next.executionContext : null;
    });
}

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
import { TaskQueue } from "aurelia-task-queue";
import { CompositionEngine, ViewSlot, ViewResources, customElement, bindable, noView } from 'aurelia-templating';
export let Compose = class {
    constructor(element, container, compositionEngine, viewSlot, viewResources, taskQueue) {
        this.element = element;
        this.container = container;
        this.compositionEngine = compositionEngine;
        this.viewSlot = viewSlot;
        this.viewResources = viewResources;
        this.taskQueue = taskQueue;
    }
    bind(executionContext) {
        this.executionContext = executionContext;
        processInstruction(this, createInstruction(this, {
            view: this.view,
            viewModel: this.viewModel,
            model: this.model
        }));
    }
    modelChanged(newValue, oldValue) {
        if (this.currentInstruction) {
            this.currentInstruction.model = newValue;
            return;
        }
        this.taskQueue.queueMicroTask(() => {
            if (this.currentInstruction) {
                this.currentInstruction.model = newValue;
                return;
            }
            var vm = this.currentViewModel;
            if (vm && typeof vm.activate === 'function') {
                vm.activate(newValue);
            }
        });
    }
    viewChanged(newValue, oldValue) {
        var instruction = createInstruction(this, {
            view: newValue,
            viewModel: this.currentViewModel || this.viewModel,
            model: this.model
        });
        if (this.currentInstruction) {
            this.currentInstruction = instruction;
            return;
        }
        this.currentInstruction = instruction;
        this.taskQueue.queueMicroTask(() => processInstruction(this, this.currentInstruction));
    }
    viewModelChanged(newValue, oldValue) {
        var instruction = createInstruction(this, {
            viewModel: newValue,
            view: this.view,
            model: this.model
        });
        if (this.currentInstruction) {
            this.currentInstruction = instruction;
            return;
        }
        this.currentInstruction = instruction;
        this.taskQueue.queueMicroTask(() => processInstruction(this, this.currentInstruction));
    }
};
Compose = __decorate([
    customElement('compose'),
    bindable('model'),
    bindable('view'),
    bindable('viewModel'),
    noView,
    inject(Element, Container, CompositionEngine, ViewSlot, ViewResources, TaskQueue), 
    __metadata('design:paramtypes', [Object, Object, Object, Object, Object, Object])
], Compose);
function createInstruction(composer, instruction) {
    return Object.assign(instruction, {
        executionContext: composer.executionContext,
        container: composer.container,
        viewSlot: composer.viewSlot,
        viewResources: composer.viewResources,
        currentBehavior: composer.currentBehavior,
        host: composer.element
    });
}
function processInstruction(composer, instruction) {
    composer.currentInstruction = null;
    composer.compositionEngine.compose(instruction).then(next => {
        composer.currentBehavior = next;
        composer.currentViewModel = next ? next.executionContext : null;
    });
}

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
import { ViewSlot, ViewStrategy, customElement, noView } from 'aurelia-templating';
import { Router } from 'aurelia-router';
import { Origin } from 'aurelia-metadata';
export let RouterView = class {
    constructor(element, container, viewSlot, router) {
        this.element = element;
        this.container = container;
        this.viewSlot = viewSlot;
        this.router = router;
        this.router.registerViewPort(this, this.element.getAttribute('name'));
    }
    bind(executionContext) {
        this.container.viewModel = executionContext;
    }
    process(viewPortInstruction, waitToSwap) {
        var component = viewPortInstruction.component, viewStrategy = component.view, childContainer = component.childContainer, viewModel = component.executionContext, viewModelResource = component.viewModelResource, metadata = viewModelResource.metadata;
        if (!viewStrategy && 'getViewStrategy' in viewModel) {
            viewStrategy = viewModel.getViewStrategy();
        }
        if (viewStrategy) {
            viewStrategy = ViewStrategy.normalize(viewStrategy);
            viewStrategy.makeRelativeTo((Origin.get(component.router.container.viewModel.constructor)).moduleId);
        }
        return metadata.load(childContainer, viewModelResource.value, viewStrategy, true).then(viewFactory => {
            viewPortInstruction.behavior = metadata.create(childContainer, {
                executionContext: viewModel,
                viewFactory: viewFactory,
                suppressBind: true
            });
            if (waitToSwap) {
                return;
            }
            this.swap(viewPortInstruction);
        });
    }
    swap(viewPortInstruction) {
        viewPortInstruction.behavior.view.bind(viewPortInstruction.behavior.executionContext);
        this.viewSlot.swap(viewPortInstruction.behavior.view);
        if (this.view) {
            this.view.unbind();
        }
        this.view = viewPortInstruction.behavior.view;
    }
};
RouterView = __decorate([
    customElement('router-view'),
    noView,
    inject(Element, Container, ViewSlot, Router), 
    __metadata('design:paramtypes', [Object, Object, Object, Object])
], RouterView);

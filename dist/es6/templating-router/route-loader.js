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
import { inject } from 'aurelia-dependency-injection';
import { CompositionEngine } from 'aurelia-templating';
import { RouteLoader, Router } from 'aurelia-router';
import { relativeToFile } from 'aurelia-path';
import { Origin } from 'aurelia-metadata';
export let TemplatingRouteLoader = class extends RouteLoader {
    constructor(compositionEngine) {
        super();
        this.compositionEngine = compositionEngine;
    }
    loadRoute(router, config) {
        var childContainer = router.container.createChild(), instruction = {
            viewModel: relativeToFile(config.moduleId, (Origin.get(router.container.viewModel.constructor)).moduleId),
            childContainer: childContainer,
            view: config.view || config.viewStrategy
        };
        childContainer.getChildRouter = function () {
            var childRouter;
            childContainer.registerHandler(Router, c => {
                return childRouter || (childRouter = router.createChild(childContainer));
            });
            return childContainer.get(Router);
        };
        return this.compositionEngine.createViewModel(instruction).then(instruction => {
            instruction.executionContext = instruction.viewModel;
            instruction.router = router;
            return instruction;
        });
    }
};
TemplatingRouteLoader = __decorate([
    inject(CompositionEngine), 
    __metadata('design:paramtypes', [Object])
], TemplatingRouteLoader);

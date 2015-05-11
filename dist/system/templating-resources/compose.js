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
};System.register(['aurelia-dependency-injection', "aurelia-task-queue", 'aurelia-templating'], function(exports_1) {
    var aurelia_dependency_injection_1, aurelia_task_queue_1, aurelia_templating_1;
    var Compose;
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
        composer.compositionEngine.compose(instruction).then(function (next) {
            composer.currentBehavior = next;
            composer.currentViewModel = next ? next.executionContext : null;
        });
    }
    return {
        setters:[
            function (_aurelia_dependency_injection_1) {
                aurelia_dependency_injection_1 = _aurelia_dependency_injection_1;
            },
            function (_aurelia_task_queue_1) {
                aurelia_task_queue_1 = _aurelia_task_queue_1;
            },
            function (_aurelia_templating_1) {
                aurelia_templating_1 = _aurelia_templating_1;
            }],
        execute: function() {
            Compose = (function () {
                function Compose(element, container, compositionEngine, viewSlot, viewResources, taskQueue) {
                    this.element = element;
                    this.container = container;
                    this.compositionEngine = compositionEngine;
                    this.viewSlot = viewSlot;
                    this.viewResources = viewResources;
                    this.taskQueue = taskQueue;
                }
                Compose.prototype.bind = function (executionContext) {
                    this.executionContext = executionContext;
                    processInstruction(this, createInstruction(this, {
                        view: this.view,
                        viewModel: this.viewModel,
                        model: this.model
                    }));
                };
                Compose.prototype.modelChanged = function (newValue, oldValue) {
                    var _this = this;
                    if (this.currentInstruction) {
                        this.currentInstruction.model = newValue;
                        return;
                    }
                    this.taskQueue.queueMicroTask(function () {
                        if (_this.currentInstruction) {
                            _this.currentInstruction.model = newValue;
                            return;
                        }
                        var vm = _this.currentViewModel;
                        if (vm && typeof vm.activate === 'function') {
                            vm.activate(newValue);
                        }
                    });
                };
                Compose.prototype.viewChanged = function (newValue, oldValue) {
                    var _this = this;
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
                    this.taskQueue.queueMicroTask(function () { return processInstruction(_this, _this.currentInstruction); });
                };
                Compose.prototype.viewModelChanged = function (newValue, oldValue) {
                    var _this = this;
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
                    this.taskQueue.queueMicroTask(function () { return processInstruction(_this, _this.currentInstruction); });
                };
                Compose = __decorate([
                    aurelia_templating_1.customElement('compose'),
                    aurelia_templating_1.bindable('model'),
                    aurelia_templating_1.bindable('view'),
                    aurelia_templating_1.bindable('viewModel'),
                    aurelia_templating_1.noView,
                    aurelia_dependency_injection_1.inject(Element, aurelia_dependency_injection_1.Container, aurelia_templating_1.CompositionEngine, aurelia_templating_1.ViewSlot, aurelia_templating_1.ViewResources, aurelia_task_queue_1.TaskQueue), 
                    __metadata('design:paramtypes', [Object, Object, Object, Object, Object, Object])
                ], Compose);
                return Compose;
            })();
            exports_1("Compose", Compose);
        }
    }
});

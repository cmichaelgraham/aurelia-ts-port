System.register(['aurelia-metadata', './view-strategy', './view-engine', './html-behavior'], function(exports_1) {
    var aurelia_metadata_1, view_strategy_1, view_engine_1, html_behavior_1;
    var CompositionEngine;
    return {
        setters:[
            function (_aurelia_metadata_1) {
                aurelia_metadata_1 = _aurelia_metadata_1;
            },
            function (_view_strategy_1) {
                view_strategy_1 = _view_strategy_1;
            },
            function (_view_engine_1) {
                view_engine_1 = _view_engine_1;
            },
            function (_html_behavior_1) {
                html_behavior_1 = _html_behavior_1;
            }],
        execute: function() {
            CompositionEngine = (function () {
                function CompositionEngine(viewEngine) {
                    this.viewEngine = viewEngine;
                }
                CompositionEngine.inject = function () { return [view_engine_1.ViewEngine]; };
                CompositionEngine.prototype.activate = function (instruction) {
                    if (instruction.skipActivation || typeof instruction.viewModel.activate !== 'function') {
                        return Promise.resolve();
                    }
                    return instruction.viewModel.activate(instruction.model) || Promise.resolve();
                };
                CompositionEngine.prototype.createBehaviorAndSwap = function (instruction) {
                    return this.createBehavior(instruction).then(function (behavior) {
                        behavior.view.bind(behavior.executionContext);
                        instruction.viewSlot.swap(behavior.view);
                        if (instruction.currentBehavior) {
                            instruction.currentBehavior.unbind();
                        }
                        return behavior;
                    });
                };
                CompositionEngine.prototype.createBehavior = function (instruction) {
                    var childContainer = instruction.childContainer, viewModelResource = instruction.viewModelResource, viewModel = instruction.viewModel, metadata;
                    return this.activate(instruction).then(function () {
                        var doneLoading, viewStrategyFromViewModel, origin;
                        if ('getViewStrategy' in viewModel && !instruction.view) {
                            viewStrategyFromViewModel = true;
                            instruction.view = view_strategy_1.ViewStrategy.normalize(viewModel.getViewStrategy());
                        }
                        if (instruction.view) {
                            if (viewStrategyFromViewModel) {
                                origin = aurelia_metadata_1.Origin.get(viewModel.constructor);
                                if (origin) {
                                    instruction.view.makeRelativeTo(origin.moduleId);
                                }
                            }
                            else if (instruction.viewResources) {
                                instruction.view.makeRelativeTo(instruction.viewResources.viewUrl);
                            }
                        }
                        if (viewModelResource) {
                            metadata = viewModelResource.metadata;
                            doneLoading = metadata.load(childContainer, viewModelResource.value, instruction.view, true);
                        }
                        else {
                            metadata = new html_behavior_1.HtmlBehaviorResource();
                            metadata.elementName = 'dynamic-element';
                            doneLoading = metadata.load(childContainer, viewModel.constructor, instruction.view, true).then(function (viewFactory) {
                                metadata.analyze(instruction.container || childContainer, viewModel.constructor);
                                return viewFactory;
                            });
                        }
                        return doneLoading.then(function (viewFactory) {
                            return metadata.create(childContainer, {
                                executionContext: viewModel,
                                viewFactory: viewFactory,
                                suppressBind: true,
                                host: instruction.host
                            });
                        });
                    });
                };
                CompositionEngine.prototype.createViewModel = function (instruction) {
                    var childContainer = instruction.childContainer || instruction.container.createChild();
                    instruction.viewModel = instruction.viewResources
                        ? instruction.viewResources.relativeToView(instruction.viewModel)
                        : instruction.viewModel;
                    return this.viewEngine.importViewModelResource(instruction.viewModel).then(function (viewModelResource) {
                        childContainer.autoRegister(viewModelResource.value);
                        if (instruction.host) {
                            childContainer.registerInstance(Element, instruction.host);
                        }
                        instruction.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
                        instruction.viewModelResource = viewModelResource;
                        return instruction;
                    });
                };
                CompositionEngine.prototype.compose = function (instruction) {
                    var _this = this;
                    instruction.childContainer = instruction.childContainer || instruction.container.createChild();
                    instruction.view = view_strategy_1.ViewStrategy.normalize(instruction.view);
                    if (instruction.viewModel) {
                        if (typeof instruction.viewModel === 'string') {
                            return this.createViewModel(instruction).then(function (instruction) {
                                return _this.createBehaviorAndSwap(instruction);
                            });
                        }
                        else {
                            return this.createBehaviorAndSwap(instruction);
                        }
                    }
                    else if (instruction.view) {
                        if (instruction.viewResources) {
                            instruction.view.makeRelativeTo(instruction.viewResources.viewUrl);
                        }
                        return instruction.view.loadViewFactory(this.viewEngine).then(function (viewFactory) {
                            var result = viewFactory.create(instruction.childContainer, instruction.executionContext);
                            instruction.viewSlot.swap(result);
                            return result;
                        });
                    }
                    else if (instruction.viewSlot) {
                        instruction.viewSlot.removeAll();
                        return Promise.resolve(null);
                    }
                };
                return CompositionEngine;
            })();
            exports_1("CompositionEngine", CompositionEngine);
        }
    }
});

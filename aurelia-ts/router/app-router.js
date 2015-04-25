var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-history', './router', './pipeline-provider', './navigation-commands', 'aurelia-event-aggregator', './router-configuration'], function (require, exports, aurelia_dependency_injection_1, aurelia_history_1, router_1, pipeline_provider_1, navigation_commands_1, aurelia_event_aggregator_1, router_configuration_1) {
    var AppRouter = (function (_super) {
        __extends(AppRouter, _super);
        function AppRouter(container, history, pipelineProvider, events) {
            _super.call(this, container, history);
            this.pipelineProvider = pipelineProvider;
            document.addEventListener('click', handleLinkClick.bind(this), true);
            this.events = events;
        }
        AppRouter.inject = function () { return [aurelia_dependency_injection_1.Container, aurelia_history_1.History, pipeline_provider_1.PipelineProvider, aurelia_event_aggregator_1.EventAggregator]; };
        Object.defineProperty(AppRouter.prototype, "isRoot", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        AppRouter.prototype.loadUrl = function (url) {
            var _this = this;
            return this.createNavigationInstruction(url)
                .then(function (instruction) { return _this.queueInstruction(instruction); })
                .catch(function (error) {
                console.error(error);
                if (_this.history.previousFragment) {
                    _this.navigate(_this.history.previousFragment, false);
                }
            });
        };
        AppRouter.prototype.queueInstruction = function (instruction) {
            var _this = this;
            return new Promise(function (resolve) {
                instruction.resolve = resolve;
                _this.queue.unshift(instruction);
                _this.dequeueInstruction();
            });
        };
        AppRouter.prototype.dequeueInstruction = function () {
            var _this = this;
            if (this.isNavigating) {
                return;
            }
            var instruction = this.queue.shift();
            this.queue = [];
            if (!instruction) {
                return;
            }
            this.isNavigating = true;
            this.events.publish('router:navigation:processing', instruction);
            var context = this.createNavigationContext(instruction);
            var pipeline = this.pipelineProvider.createPipeline(context);
            pipeline.run(context).then(function (result) {
                _this.isNavigating = false;
                if (!(result && 'completed' in result && 'output' in result)) {
                    throw new Error("Expected router pipeline to return a navigation result, but got [" + JSON.stringify(result) + "] instead.");
                }
                if (result.completed) {
                    _this.history.previousFragment = instruction.fragment;
                }
                if (result.output instanceof Error) {
                    console.error(result.output);
                    _this.events.publish('router:navigation:error', { instruction: instruction, result: result });
                }
                if (navigation_commands_1.isNavigationCommand(result.output)) {
                    result.output.navigate(_this);
                }
                else if (!result.completed) {
                    _this.navigate(_this.history.previousFragment || '', false);
                    _this.events.publish('router:navigation:cancelled', instruction);
                }
                instruction.resolve(result);
                _this.dequeueInstruction();
            })
                .then(function (result) { return _this.events.publish('router:navigation:complete', instruction); })
                .catch(function (error) {
                console.error(error);
            });
        };
        AppRouter.prototype.registerViewPort = function (viewPort, name) {
            var _this = this;
            _super.prototype.registerViewPort.call(this, viewPort, name);
            if (!this.isActive) {
                if ('configureRouter' in this.container.viewModel) {
                    var config = new router_configuration_1.RouterConfiguration();
                    var result = Promise.resolve(this.container.viewModel.configureRouter(config, this));
                    return result.then(function () {
                        _this.configure(config);
                        _this.activate();
                    });
                }
                else {
                    this.activate();
                }
            }
            else {
                this.dequeueInstruction();
            }
        };
        AppRouter.prototype.activate = function (options) {
            if (this.isActive) {
                return;
            }
            this.isActive = true;
            this.options = Object.assign({ routeHandler: this.loadUrl.bind(this) }, this.options, options);
            this.history.activate(this.options);
            this.dequeueInstruction();
        };
        AppRouter.prototype.deactivate = function () {
            this.isActive = false;
            this.history.deactivate();
        };
        AppRouter.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.queue = [];
            this.options = null;
        };
        return AppRouter;
    })(router_1.Router);
    exports.AppRouter = AppRouter;
    function findAnchor(el) {
        while (el) {
            if (el.tagName === "A")
                return el;
            el = el.parentNode;
        }
    }
    function handleLinkClick(evt) {
        if (!this.isActive) {
            return;
        }
        var target = findAnchor(evt.target);
        if (!target) {
            return;
        }
        if (this.history._hasPushState) {
            if (!evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && targetIsThisWindow(target)) {
                var href = target.getAttribute('href');
                // Ensure the protocol is not part of URL, meaning its relative.
                // Stop the event bubbling to ensure the link will not cause a page refresh.
                if (href !== null && !(href.charAt(0) === "#" || (/^[a-z]+:/i).test(href))) {
                    evt.preventDefault();
                    this.history.navigate(href);
                }
            }
        }
    }
    function targetIsThisWindow(target) {
        var targetWindow = target.getAttribute('target');
        return !targetWindow ||
            targetWindow === window.name ||
            targetWindow === '_self' ||
            (targetWindow === 'top' && window === window.top);
    }
});

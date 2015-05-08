var aurelia_dependency_injection_1 = require('aurelia-dependency-injection');
var pipeline_1 = require('./pipeline');
var navigation_plan_1 = require('./navigation-plan');
var route_loading_1 = require('./route-loading');
var navigation_context_1 = require('./navigation-context');
var activation_1 = require('./activation');
var route_filters_1 = require('./route-filters');
var PipelineProvider = (function () {
    function PipelineProvider(container) {
        this.container = container;
        this.steps = [
            navigation_plan_1.BuildNavigationPlanStep,
            activation_1.CanDeactivatePreviousStep,
            route_loading_1.LoadRouteStep,
            route_filters_1.createRouteFilterStep('authorize'),
            route_filters_1.createRouteFilterStep('modelbind'),
            activation_1.CanActivateNextStep,
            //NOTE: app state changes start below - point of no return
            activation_1.DeactivatePreviousStep,
            activation_1.ActivateNextStep,
            route_filters_1.createRouteFilterStep('precommit'),
            navigation_context_1.CommitChangesStep
        ];
    }
    PipelineProvider.inject = function () { return [aurelia_dependency_injection_1.Container]; };
    PipelineProvider.prototype.createPipeline = function (navigationContext) {
        var _this = this;
        var pipeline = new pipeline_1.Pipeline();
        this.steps.forEach(function (step) { return pipeline.withStep(_this.container.get(step)); });
        return pipeline;
    };
    return PipelineProvider;
})();
exports.PipelineProvider = PipelineProvider;

var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", '../dependency-injection/index', './pipeline', './navigation-plan', './route-loading', './navigation-context', './activation', './route-filters'], function (require, exports, index_1, pipeline_1, navigation_plan_1, route_loading_1, navigation_context_1, activation_1, route_filters_1) {
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
        PipelineProvider.inject = function () { return [index_1.Container]; };
        PipelineProvider.prototype.createPipeline = function (navigationContext) {
            var _this = this;
            var pipeline = new pipeline_1.Pipeline();
            this.steps.forEach(function (step) { return pipeline.withStep(_this.container.get(step)); });
            return pipeline;
        };
        return PipelineProvider;
    })();
    exports.PipelineProvider = PipelineProvider;
});

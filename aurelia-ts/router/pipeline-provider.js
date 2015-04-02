define(["require", "exports", '../dependency-injection/index', './pipeline', './navigation-plan', './route-loading', './navigation-context', './activation', './route-filters'], function (require, exports, _index, _pipeline, _navigation_plan, _route_loading, _navigation_context, _activation, _route_filters) {
    var PipelineProvider = (function () {
        function PipelineProvider(container) {
            this.container = container;
            this.steps = [
                _navigation_plan.BuildNavigationPlanStep,
                _activation.CanDeactivatePreviousStep,
                _route_loading.LoadRouteStep,
                _route_filters.createRouteFilterStep('authorize'),
                _route_filters.createRouteFilterStep('modelbind'),
                _activation.CanActivateNextStep,
                //NOTE: app state changes start below - point of no return
                _activation.DeactivatePreviousStep,
                _activation.ActivateNextStep,
                _route_filters.createRouteFilterStep('precommit'),
                _navigation_context.CommitChangesStep
            ];
        }
        PipelineProvider.inject = function () {
            return [
                _index.Container
            ];
        };
        PipelineProvider.prototype.createPipeline = function (navigationContext) {
            var _this = this;
            var pipeline = new _pipeline.Pipeline();
            this.steps.forEach(function (step) {
                return pipeline.withStep(_this.container.get(step));
            });
            return pipeline;
        };
        return PipelineProvider;
    })();
    exports.PipelineProvider = PipelineProvider;
});

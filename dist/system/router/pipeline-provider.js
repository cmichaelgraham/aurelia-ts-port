System.register(['aurelia-dependency-injection', './pipeline', './navigation-plan', './route-loading', './navigation-context', './activation', './route-filters'], function(exports_1) {
    var aurelia_dependency_injection_1, pipeline_1, navigation_plan_1, route_loading_1, navigation_context_1, activation_1, route_filters_1;
    var PipelineProvider;
    return {
        setters:[
            function (_aurelia_dependency_injection_1) {
                aurelia_dependency_injection_1 = _aurelia_dependency_injection_1;
            },
            function (_pipeline_1) {
                pipeline_1 = _pipeline_1;
            },
            function (_navigation_plan_1) {
                navigation_plan_1 = _navigation_plan_1;
            },
            function (_route_loading_1) {
                route_loading_1 = _route_loading_1;
            },
            function (_navigation_context_1) {
                navigation_context_1 = _navigation_context_1;
            },
            function (_activation_1) {
                activation_1 = _activation_1;
            },
            function (_route_filters_1) {
                route_filters_1 = _route_filters_1;
            }],
        execute: function() {
            PipelineProvider = (function () {
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
            exports_1("PipelineProvider", PipelineProvider);
        }
    }
});

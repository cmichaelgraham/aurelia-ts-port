define(["require", "exports", './router', './app-router', './pipeline-provider', './navigation-commands', './route-loading', './router-configuration', './navigation-plan', './route-filters'], function (require, exports, router_1, app_router_1, pipeline_provider_1, navigation_commands_1, route_loading_1, router_configuration_1, navigation_plan_1, route_filters_1) {
    exports.Router = router_1.Router;
    exports.AppRouter = app_router_1.AppRouter;
    exports.PipelineProvider = pipeline_provider_1.PipelineProvider;
    exports.Redirect = navigation_commands_1.Redirect;
    exports.RouteLoader = route_loading_1.RouteLoader;
    exports.RouterConfiguration = router_configuration_1.RouterConfiguration;
    exports.activationStrategy = navigation_plan_1.activationStrategy;
    exports.RouteFilterContainer = route_filters_1.RouteFilterContainer;
    exports.createRouteFilterStep = route_filters_1.createRouteFilterStep;
});

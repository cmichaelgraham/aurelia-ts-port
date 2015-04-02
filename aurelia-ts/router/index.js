define(["require", "exports", './router', './app-router', './pipeline-provider', './navigation-commands', './route-loading', './router-configuration', './navigation-plan', './route-filters'], function (require, exports, _router, _app_router, _pipeline_provider, _navigation_commands, _route_loading, _router_configuration, _navigation_plan, _route_filters) {
    exports.Router = _router.Router;
    exports.AppRouter = _app_router.AppRouter;
    exports.PipelineProvider = _pipeline_provider.PipelineProvider;
    exports.Redirect = _navigation_commands.Redirect;
    exports.RouteLoader = _route_loading.RouteLoader;
    exports.RouterConfiguration = _router_configuration.RouterConfiguration;
    exports.NO_CHANGE = _navigation_plan.NO_CHANGE;
    exports.INVOKE_LIFECYCLE = _navigation_plan.INVOKE_LIFECYCLE;
    exports.REPLACE = _navigation_plan.REPLACE;
    exports.RouteFilterContainer = _route_filters.RouteFilterContainer;
    exports.createRouteFilterStep = _route_filters.createRouteFilterStep;
});

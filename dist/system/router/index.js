System.register(['./router', './app-router', './pipeline-provider', './navigation-commands', './route-loading', './router-configuration', './navigation-plan', './route-filters'], function(exports_1) {
    return {
        setters:[
            function (_router_1) {
                exports_1("Router", _router_1["Router"]);
            },
            function (_app_router_1) {
                exports_1("AppRouter", _app_router_1["AppRouter"]);
            },
            function (_pipeline_provider_1) {
                exports_1("PipelineProvider", _pipeline_provider_1["PipelineProvider"]);
            },
            function (_navigation_commands_1) {
                exports_1("Redirect", _navigation_commands_1["Redirect"]);
            },
            function (_route_loading_1) {
                exports_1("RouteLoader", _route_loading_1["RouteLoader"]);
            },
            function (_router_configuration_1) {
                exports_1("RouterConfiguration", _router_configuration_1["RouterConfiguration"]);
            },
            function (_navigation_plan_1) {
                exports_1("activationStrategy", _navigation_plan_1["activationStrategy"]);
            },
            function (_route_filters_1) {
                exports_1("RouteFilterContainer", _route_filters_1["RouteFilterContainer"]);
                exports_1("createRouteFilterStep", _route_filters_1["createRouteFilterStep"]);
            }],
        execute: function() {
        }
    }
});

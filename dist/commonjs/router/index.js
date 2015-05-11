var router_1 = require('./router');
exports.Router = router_1.Router;
var app_router_1 = require('./app-router');
exports.AppRouter = app_router_1.AppRouter;
var pipeline_provider_1 = require('./pipeline-provider');
exports.PipelineProvider = pipeline_provider_1.PipelineProvider;
var navigation_commands_1 = require('./navigation-commands');
exports.Redirect = navigation_commands_1.Redirect;
var route_loading_1 = require('./route-loading');
exports.RouteLoader = route_loading_1.RouteLoader;
var router_configuration_1 = require('./router-configuration');
exports.RouterConfiguration = router_configuration_1.RouterConfiguration;
var navigation_plan_1 = require('./navigation-plan');
exports.activationStrategy = navigation_plan_1.activationStrategy;
var route_filters_1 = require('./route-filters');
exports.RouteFilterContainer = route_filters_1.RouteFilterContainer;
exports.createRouteFilterStep = route_filters_1.createRouteFilterStep;
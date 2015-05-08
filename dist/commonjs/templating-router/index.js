var aurelia_router_1 = require('aurelia-router');
var route_loader_1 = require('./route-loader');
function configure(aurelia) {
    aurelia.withSingleton(aurelia_router_1.RouteLoader, route_loader_1.TemplatingRouteLoader)
        .withSingleton(aurelia_router_1.Router, aurelia_router_1.AppRouter)
        .globalizeResources('./router-view', './route-href');
}
exports.configure = configure;
var route_loader_2 = require('./route-loader');
exports.TemplatingRouteLoader = route_loader_2.TemplatingRouteLoader;
var router_view_1 = require('./router-view');
exports.RouterView = router_view_1.RouterView;
var route_href_1 = require('./route-href');
exports.RouteHref = route_href_1.RouteHref;

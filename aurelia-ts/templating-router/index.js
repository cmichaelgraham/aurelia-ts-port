define(["require", "exports", 'aurelia-router', './route-loader', './router-view', './route-href'], function (require, exports, aurelia_router_1, route_loader_1, router_view_1, route_href_1) {
    exports.TemplatingRouteLoader = route_loader_1.TemplatingRouteLoader;
    exports.RouterView = router_view_1.RouterView;
    exports.RouteHref = route_href_1.RouteHref;
    function install(aurelia) {
        aurelia.withSingleton(aurelia_router_1.RouteLoader, route_loader_1.TemplatingRouteLoader)
            .withSingleton(aurelia_router_1.Router, aurelia_router_1.AppRouter)
            .globalizeResources('./router-view', './route-href');
    }
    exports.install = install;
});

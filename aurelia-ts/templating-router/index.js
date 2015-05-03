define(["require", "exports", 'aurelia-router', './route-loader', './route-loader', './router-view', './route-href'], function (require, exports, aurelia_router_1, route_loader_1, route_loader_2, router_view_1, route_href_1) {
    function configure(aurelia) {
        aurelia.withSingleton(aurelia_router_1.RouteLoader, route_loader_1.TemplatingRouteLoader)
            .withSingleton(aurelia_router_1.Router, aurelia_router_1.AppRouter)
            .globalizeResources('./router-view', './route-href');
    }
    exports.configure = configure;
    exports.TemplatingRouteLoader = route_loader_2.TemplatingRouteLoader;
    exports.RouterView = router_view_1.RouterView;
    exports.RouteHref = route_href_1.RouteHref;
});

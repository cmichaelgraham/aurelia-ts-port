System.register(['aurelia-router', './route-loader', './route-loader', './router-view', './route-href'], function(exports_1) {
    var aurelia_router_1, route_loader_1;
    function configure(aurelia) {
        aurelia.withSingleton(aurelia_router_1.RouteLoader, route_loader_1.TemplatingRouteLoader)
            .withSingleton(aurelia_router_1.Router, aurelia_router_1.AppRouter)
            .globalizeResources('./router-view', './route-href');
    }
    exports_1("configure", configure);
    return {
        setters:[
            function (_aurelia_router_1) {
                aurelia_router_1 = _aurelia_router_1;
            },
            function (_route_loader_1) {
                route_loader_1 = _route_loader_1;
            },
            function (_route_loader_2) {
                exports_1("TemplatingRouteLoader", _route_loader_2["TemplatingRouteLoader"]);
            },
            function (_router_view_1) {
                exports_1("RouterView", _router_view_1["RouterView"]);
            },
            function (_route_href_1) {
                exports_1("RouteHref", _route_href_1["RouteHref"]);
            }],
        execute: function() {
        }
    }
});

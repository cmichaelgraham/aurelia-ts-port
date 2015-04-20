var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'aurelia-router', './route-loader', './router-view'], function (require, exports, aurelia_router_1, route_loader_1, router_view_1) {
    exports.TemplatingRouteLoader = route_loader_1.TemplatingRouteLoader;
    exports.RouterView = router_view_1.RouterView;
    function install(aurelia) {
        aurelia.withSingleton(aurelia_router_1.RouteLoader, route_loader_1.TemplatingRouteLoader)
            .withSingleton(aurelia_router_1.Router, aurelia_router_1.AppRouter)
            .globalizeResources('./router-view');
    }
    exports.install = install;
});

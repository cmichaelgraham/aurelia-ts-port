var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", '../router/index', './route-loader', './router-view'], function (require, exports, index_1, route_loader_1, router_view_1) {
    exports.TemplatingRouteLoader = route_loader_1.TemplatingRouteLoader;
    exports.RouterView = router_view_1.RouterView;
    function install(aurelia) {
        aurelia.withSingleton(index_1.RouteLoader, route_loader_1.TemplatingRouteLoader)
            .withSingleton(index_1.Router, index_1.AppRouter)
            .globalizeResources('./router-view');
    }
    exports.install = install;
});

define(["require", "exports", '../router/index', './route-loader', './router-view'], function (require, exports, _index, _route_loader, _router_view) {
    function install(aurelia) {
        aurelia.withSingleton(_index.RouteLoader, _route_loader.TemplatingRouteLoader).withSingleton(_index.Router, _index.AppRouter).globalizeResources('./router-view');
    }
    exports.install = install;
    exports._route_loader.TemplatingRouteLoader = _route_loader.TemplatingRouteLoader;
    exports._router_view.RouterView = _router_view.RouterView;
    exports.install = install;
});

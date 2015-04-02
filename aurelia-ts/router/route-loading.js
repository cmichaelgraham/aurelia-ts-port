define(["require", "exports", './navigation-plan'], function (require, exports, _navigation_plan) {
    var RouteLoader = (function () {
        function RouteLoader() {
        }
        RouteLoader.prototype.loadRoute = function (router, config) {
            throw Error('Route loaders must implment "loadRoute(router, config)".');
        };
        return RouteLoader;
    })();
    exports.RouteLoader = RouteLoader;
    var LoadRouteStep = (function () {
        function LoadRouteStep(routeLoader) {
            this.routeLoader = routeLoader;
        }
        LoadRouteStep.inject = function () {
            return [
                RouteLoader
            ];
        };
        LoadRouteStep.prototype.run = function (navigationContext, next) {
            return loadNewRoute([], this.routeLoader, navigationContext).then(next).catch(next.cancel);
        };
        return LoadRouteStep;
    })();
    exports.LoadRouteStep = LoadRouteStep;
    function loadNewRoute(routers, routeLoader, navigationContext) {
        var toLoad = determineWhatToLoad(navigationContext);
        var loadPromises = toLoad.map(function (current) {
            return loadRoute(routers, routeLoader, current.navigationContext, current.viewPortPlan);
        });
        return Promise.all(loadPromises);
    }
    exports.loadNewRoute = loadNewRoute;
    function determineWhatToLoad(navigationContext, toLoad) {
        var plan = navigationContext.plan;
        var next = navigationContext.nextInstruction;
        toLoad = toLoad || [];
        for (var viewPortName in plan) {
            var viewPortPlan = plan[viewPortName];
            if (viewPortPlan.strategy == _navigation_plan.REPLACE) {
                toLoad.push({
                    viewPortPlan: viewPortPlan,
                    navigationContext: navigationContext
                });
                if (viewPortPlan.childNavigationContext) {
                    determineWhatToLoad(viewPortPlan.childNavigationContext, toLoad);
                }
            }
            else {
                var viewPortInstruction = next.addViewPortInstruction(viewPortName, viewPortPlan.strategy, viewPortPlan.prevModuleId, viewPortPlan.prevComponent);
                if (viewPortPlan.childNavigationContext) {
                    viewPortInstruction.childNavigationContext = viewPortPlan.childNavigationContext;
                    determineWhatToLoad(viewPortPlan.childNavigationContext, toLoad);
                }
            }
        }
        return toLoad;
    }
    function loadRoute(routers, routeLoader, navigationContext, viewPortPlan) {
        var moduleId = viewPortPlan.config.moduleId;
        var next = navigationContext.nextInstruction;
        routers.push(navigationContext.router);
        return loadComponent(routeLoader, navigationContext, viewPortPlan.config).then(function (component) {
            var viewPortInstruction = next.addViewPortInstruction(viewPortPlan.name, viewPortPlan.strategy, moduleId, component);
            var controller = component.executionContext;
            if (controller.router && controller.router.isConfigured && routers.indexOf(controller.router) === -1) {
                var path = next.getWildcardPath();
                return controller.router.createNavigationInstruction(path, next).then(function (childInstruction) {
                    viewPortPlan.childNavigationContext = controller.router.createNavigationContext(childInstruction);
                    return _navigation_plan.buildNavigationPlan(viewPortPlan.childNavigationContext).then(function (childPlan) {
                        viewPortPlan.childNavigationContext.plan = childPlan;
                        viewPortInstruction.childNavigationContext = viewPortPlan.childNavigationContext;
                        return loadNewRoute(routers, routeLoader, viewPortPlan.childNavigationContext);
                    });
                });
            }
        });
    }
    function loadComponent(routeLoader, navigationContext, config) {
        var router = navigationContext.router, lifecycleArgs = navigationContext.nextInstruction.lifecycleArgs;
        return routeLoader.loadRoute(router, config).then(function (component) {
            if ('configureRouter' in component.executionContext) {
                var result = (_a = component.executionContext).configureRouter.apply(_a, lifecycleArgs) || Promise.resolve();
                return result.then(function () {
                    return component;
                });
            }
            component.router = router;
            component.config = config;
            return component;
            var _a;
        });
    }
});

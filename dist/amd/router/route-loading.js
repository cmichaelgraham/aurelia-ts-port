define(["require", "exports", './navigation-plan', './router-configuration'], function (require, exports, navigation_plan_1, router_configuration_1) {
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
        LoadRouteStep.inject = function () { return [RouteLoader]; };
        LoadRouteStep.prototype.run = function (navigationContext, next) {
            return loadNewRoute(this.routeLoader, navigationContext)
                .then(next)
                .catch(next.cancel);
        };
        return LoadRouteStep;
    })();
    exports.LoadRouteStep = LoadRouteStep;
    function loadNewRoute(routeLoader, navigationContext) {
        var toLoad = determineWhatToLoad(navigationContext);
        var loadPromises = toLoad.map(function (current) { return loadRoute(routeLoader, current.navigationContext, current.viewPortPlan); });
        return Promise.all(loadPromises);
    }
    exports.loadNewRoute = loadNewRoute;
    function determineWhatToLoad(navigationContext, toLoad) {
        var plan = navigationContext.plan;
        var next = navigationContext.nextInstruction;
        toLoad = toLoad || [];
        for (var viewPortName in plan) {
            var viewPortPlan = plan[viewPortName];
            if (viewPortPlan.strategy == navigation_plan_1.activationStrategy.replace) {
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
    function loadRoute(routeLoader, navigationContext, viewPortPlan) {
        var moduleId = viewPortPlan.config.moduleId;
        var next = navigationContext.nextInstruction;
        return loadComponent(routeLoader, navigationContext, viewPortPlan.config).then(function (component) {
            var viewPortInstruction = next.addViewPortInstruction(viewPortPlan.name, viewPortPlan.strategy, moduleId, component);
            var controller = component.executionContext, childRouter = component.childRouter;
            if (childRouter) {
                var path = next.getWildcardPath();
                return childRouter.createNavigationInstruction(path, next)
                    .then(function (childInstruction) {
                    viewPortPlan.childNavigationContext = childRouter.createNavigationContext(childInstruction);
                    return navigation_plan_1.buildNavigationPlan(viewPortPlan.childNavigationContext)
                        .then(function (childPlan) {
                        viewPortPlan.childNavigationContext.plan = childPlan;
                        viewPortInstruction.childNavigationContext = viewPortPlan.childNavigationContext;
                        return loadNewRoute(routeLoader, viewPortPlan.childNavigationContext);
                    });
                });
            }
        });
    }
    function loadComponent(routeLoader, navigationContext, config) {
        var router = navigationContext.router, lifecycleArgs = navigationContext.nextInstruction.lifecycleArgs;
        return routeLoader.loadRoute(router, config).then(function (component) {
            component.router = router;
            component.config = config;
            if ('configureRouter' in component.executionContext) {
                component.childRouter = component.childContainer.getChildRouter();
                var config = new router_configuration_1.RouterConfiguration();
                var result = Promise.resolve((_a = component.executionContext).configureRouter.apply(_a, [config, component.childRouter].concat(lifecycleArgs)));
                return result.then(function () {
                    component.childRouter.configure(config);
                    return component;
                });
            }
            return component;
            var _a;
        });
    }
});

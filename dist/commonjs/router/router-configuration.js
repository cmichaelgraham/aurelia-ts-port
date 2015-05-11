var route_filters_1 = require('./route-filters');
var RouterConfiguration = (function () {
    function RouterConfiguration() {
        this.instructions = [];
        this.options = {};
        this.pipelineSteps = [];
    }
    RouterConfiguration.prototype.addPipelineStep = function (name, step) {
        this.pipelineSteps.push({ name: name, step: step });
    };
    RouterConfiguration.prototype.map = function (route) {
        if (Array.isArray(route)) {
            route.forEach(this.map.bind(this));
            return this;
        }
        return this.mapRoute(route);
    };
    RouterConfiguration.prototype.mapRoute = function (config) {
        this.instructions.push(function (router) {
            var routeConfigs = [];
            if (Array.isArray(config.route)) {
                for (var i = 0, ii = config.route.length; i < ii; ++i) {
                    var current = Object.assign({}, config);
                    current.route = config.route[i];
                    routeConfigs.push(current);
                }
            }
            else {
                routeConfigs.push(Object.assign({}, config));
            }
            var navModel;
            for (var i = 0, ii = routeConfigs.length; i < ii; ++i) {
                var routeConfig = routeConfigs[i];
                routeConfig.settings = routeConfig.settings || {};
                if (!navModel) {
                    navModel = router.createNavModel(routeConfig);
                }
                router.addRoute(routeConfig, navModel);
            }
        });
        return this;
    };
    RouterConfiguration.prototype.mapUnknownRoutes = function (config) {
        this.unknownRouteConfig = config;
        return this;
    };
    RouterConfiguration.prototype.exportToRouter = function (router) {
        var instructions = this.instructions;
        for (var i = 0, ii = instructions.length; i < ii; ++i) {
            instructions[i](router);
        }
        if (this.title) {
            router.title = this.title;
        }
        if (this.unknownRouteConfig) {
            router.handleUnknownRoutes(this.unknownRouteConfig);
        }
        router.options = this.options;
        var pipelineSteps = this.pipelineSteps;
        if (pipelineSteps.length) {
            if (!router.isRoot) {
                throw new Error('Pipeline steps can only be added to the root router');
            }
            var filterContainer = router.container.get(route_filters_1.RouteFilterContainer);
            for (var i = 0, ii = pipelineSteps.length; i < ii; ++i) {
                var _a = pipelineSteps[i], name_1 = _a.name, step = _a.step;
                filterContainer.addStep(name_1, step);
            }
        }
    };
    return RouterConfiguration;
})();
exports.RouterConfiguration = RouterConfiguration;

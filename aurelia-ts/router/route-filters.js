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
define(["require", "exports", '../dependency-injection/index'], function (require, exports, index_1) {
    var RouteFilterContainer = (function () {
        function RouteFilterContainer(container) {
            this.container = container;
            this.filters = {};
            this.filterCache = {};
        }
        RouteFilterContainer.inject = function () { return [index_1.Container]; };
        RouteFilterContainer.prototype.addStep = function (name, step, index) {
            if (index === void 0) { index = -1; }
            var filter = this.filters[name];
            if (!filter) {
                filter = this.filters[name] = [];
            }
            if (index === -1) {
                index = filter.length;
            }
            filter.splice(index, 0, step);
            this.filterCache = {};
        };
        RouteFilterContainer.prototype.getFilterSteps = function (name) {
            if (this.filterCache[name]) {
                return this.filterCache[name];
            }
            var steps = [];
            var filter = this.filters[name];
            if (!filter) {
                return steps;
            }
            for (var i = 0, l = filter.length; i < l; i++) {
                if (typeof filter[i] === 'string') {
                    steps.push.apply(steps, this.getFilterSteps(filter[i]));
                }
                else {
                    steps.push(this.container.get(filter[i]));
                }
            }
            return this.filterCache[name] = steps;
        };
        return RouteFilterContainer;
    })();
    exports.RouteFilterContainer = RouteFilterContainer;
    function createRouteFilterStep(name) {
        function create(routeFilterContainer) {
            return new RouteFilterStep(name, routeFilterContainer);
        }
        ;
        create["inject"] = function () {
            return [RouteFilterContainer];
        };
        return create;
    }
    exports.createRouteFilterStep = createRouteFilterStep;
    var RouteFilterStep = (function () {
        function RouteFilterStep(name, routeFilterContainer) {
            this.name = name;
            this.routeFilterContainer = routeFilterContainer;
            this.isMultiStep = true;
        }
        RouteFilterStep.prototype.getSteps = function () {
            return this.routeFilterContainer.getFilterSteps(this.name);
        };
        return RouteFilterStep;
    })();
});

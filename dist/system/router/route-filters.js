System.register(['aurelia-dependency-injection'], function(exports_1) {
    var aurelia_dependency_injection_1;
    var RouteFilterContainer, RouteFilterStep;
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
    exports_1("createRouteFilterStep", createRouteFilterStep);
    return {
        setters:[
            function (_aurelia_dependency_injection_1) {
                aurelia_dependency_injection_1 = _aurelia_dependency_injection_1;
            }],
        execute: function() {
            RouteFilterContainer = (function () {
                function RouteFilterContainer(container) {
                    this.container = container;
                    this.filters = {};
                    this.filterCache = {};
                }
                RouteFilterContainer.inject = function () { return [aurelia_dependency_injection_1.Container]; };
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
            exports_1("RouteFilterContainer", RouteFilterContainer);
            RouteFilterStep = (function () {
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
        }
    }
});

var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports"], function (require, exports) {
    var NavigationInstruction = (function () {
        function NavigationInstruction(fragment, queryString, params, queryParams, config, parentInstruction) {
            this.fragment = fragment;
            this.queryString = queryString;
            this.params = params || {};
            this.queryParams = queryParams;
            this.config = config;
            this.lifecycleArgs = [params, queryParams, config, this];
            this.viewPortInstructions = {};
            if (parentInstruction) {
                this.params.$parent = parentInstruction.params;
            }
        }
        NavigationInstruction.prototype.addViewPortInstruction = function (viewPortName, strategy, moduleId, component) {
            return this.viewPortInstructions[viewPortName] = {
                name: viewPortName,
                strategy: strategy,
                moduleId: moduleId,
                component: component,
                childRouter: component.executionContext.router,
                lifecycleArgs: this.lifecycleArgs.slice()
            };
        };
        NavigationInstruction.prototype.getWildCardName = function () {
            var wildcardIndex = this.config.route.lastIndexOf('*');
            return this.config.route.substr(wildcardIndex + 1);
        };
        NavigationInstruction.prototype.getWildcardPath = function () {
            var wildcardName = this.getWildCardName(), path = this.params[wildcardName];
            if (this.queryString) {
                path += "?" + this.queryString;
            }
            return path;
        };
        NavigationInstruction.prototype.getBaseUrl = function () {
            if (!this.params) {
                return this.fragment;
            }
            var wildcardName = this.getWildCardName(), path = this.params[wildcardName];
            if (!path) {
                return this.fragment;
            }
            return this.fragment.substr(0, this.fragment.lastIndexOf(path));
        };
        return NavigationInstruction;
    })();
    exports.NavigationInstruction = NavigationInstruction;
});

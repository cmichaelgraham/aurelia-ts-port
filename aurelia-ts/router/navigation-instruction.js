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

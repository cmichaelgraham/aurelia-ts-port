System.register([], function(exports_1) {
    var NavigationInstruction;
    return {
        setters:[],
        execute: function() {
            NavigationInstruction = (function () {
                function NavigationInstruction(fragment, queryString, params, queryParams, config, parentInstruction) {
                    var allParams = Object.assign({}, queryParams, params);
                    this.fragment = fragment;
                    this.queryString = queryString;
                    this.params = params || {};
                    this.queryParams = queryParams;
                    this.config = config;
                    this.lifecycleArgs = [allParams, config, this];
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
                        childRouter: component.childRouter,
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
            exports_1("NavigationInstruction", NavigationInstruction);
        }
    }
});

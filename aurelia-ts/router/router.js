var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", '../route-recognizer/index', '../path/index', './navigation-context', './navigation-instruction', './router-configuration', './util'], function (require, exports, index_1, index_2, navigation_context_1, navigation_instruction_1, router_configuration_1, util_1) {
    var Router = (function () {
        function Router(container, history) {
            this.container = container;
            this.history = history;
            this.viewPorts = {};
            this.reset();
            this.baseUrl = '';
            this.isConfigured = false;
        }
        Object.defineProperty(Router.prototype, "isRoot", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Router.prototype.registerViewPort = function (viewPort, name) {
            name = name || 'default';
            this.viewPorts[name] = viewPort;
        };
        Router.prototype.refreshBaseUrl = function () {
            if (this.parent) {
                var baseUrl = this.parent.currentInstruction.getBaseUrl();
                this.baseUrl = this.parent.baseUrl + baseUrl;
            }
        };
        Router.prototype.refreshNavigation = function () {
            var nav = this.navigation;
            for (var i = 0, length = nav.length; i < length; i++) {
                var current = nav[i];
                if (!this.history._hasPushState) {
                    if (this.baseUrl[0] == '/') {
                        current.href = '#' + this.baseUrl;
                    }
                    else {
                        current.href = '#/' + this.baseUrl;
                    }
                }
                else {
                    current.href = '/' + this.baseUrl;
                }
                if (current.href[current.href.length - 1] != '/') {
                    current.href += '/';
                }
                current.href += current.relativeHref;
            }
        };
        Router.prototype.configure = function (callbackOrConfig) {
            this.isConfigured = true;
            if (typeof callbackOrConfig == 'function') {
                var config = new router_configuration_1.RouterConfiguration();
                callbackOrConfig(config);
                config.exportToRouter(this);
            }
            else {
                callbackOrConfig.exportToRouter(this);
            }
            return this;
        };
        Router.prototype.navigate = function (fragment, options) {
            if (!this.isConfigured && this.parent) {
                return this.parent.navigate(fragment, options);
            }
            fragment = index_2.join(this.baseUrl, fragment);
            if (fragment === '')
                fragment = '/';
            return this.history.navigate(fragment, options);
        };
        Router.prototype.navigateBack = function () {
            this.history.navigateBack();
        };
        Router.prototype.createChild = function (container) {
            var childRouter = new Router(container || this.container.createChild(), this.history);
            childRouter.parent = this;
            return childRouter;
        };
        Router.prototype.createNavigationInstruction = function (url, parentInstruction) {
            if (url === void 0) { url = ''; }
            if (parentInstruction === void 0) { parentInstruction = null; }
            var results = this.recognizer.recognize(url);
            var fragment, queryIndex, queryString;
            if (!results || !results.length) {
                results = this.childRecognizer.recognize(url);
            }
            fragment = url;
            queryIndex = fragment.indexOf("?");
            if (queryIndex != -1) {
                fragment = url.substr(0, queryIndex);
                queryString = url.substr(queryIndex + 1);
            }
            if ((!results || !results.length) && this.catchAllHandler) {
                results = [{
                        config: {
                            navModel: {}
                        },
                        handler: this.catchAllHandler,
                        params: {
                            path: fragment
                        }
                    }];
            }
            if (results && results.length) {
                var first = results[0], fragment = url, queryIndex = fragment.indexOf('?'), queryString;
                if (queryIndex != -1) {
                    fragment = url.substr(0, queryIndex);
                    queryString = url.substr(queryIndex + 1);
                }
                var instruction = new navigation_instruction_1.NavigationInstruction(fragment, queryString, first.params, first.queryParams || results.queryParams, first.config || first.handler, parentInstruction);
                if (typeof first.handler == "function") {
                    return first.handler(instruction).then(function (instruction) {
                        if (!("viewPorts" in instruction.config)) {
                            instruction.config.viewPorts = {
                                "default": {
                                    moduleId: instruction.config.moduleId
                                }
                            };
                        }
                        return instruction;
                    });
                }
                return Promise.resolve(instruction);
            }
            else {
                return Promise.reject(new Error("Route Not Found: " + url));
            }
        };
        Router.prototype.createNavigationContext = function (instruction) {
            return new navigation_context_1.NavigationContext(this, instruction);
        };
        Router.prototype.generate = function (name, params, options) {
            options = options || {};
            if ((!this.isConfigured || !this.recognizer.hasRoute(name)) && this.parent) {
                return this.parent.generate(name, params, options);
            }
            var root = '';
            var path = this.recognizer.generate(name, params);
            if (options.absolute) {
                root = (this.history.root || '') + this.baseUrl;
            }
            return root + path;
        };
        Router.prototype.addRoute = function (config, navModel) {
            if (navModel === void 0) { navModel = {}; }
            validateRouteConfig(config);
            if (!('viewPorts' in config)) {
                config.viewPorts = {
                    'default': {
                        moduleId: config.moduleId,
                        view: config.view
                    }
                };
            }
            navModel.title = navModel.title || config.title;
            navModel.settings = config.settings || (config.settings = {});
            this.routes.push(config);
            var state = this.recognizer.add({ path: config.route, handler: config });
            if (config.route) {
                var withChild, settings = config.settings;
                delete config.settings;
                withChild = JSON.parse(JSON.stringify(config));
                config.settings = settings;
                withChild.route += "/*childRoute";
                withChild.hasChildRouter = true;
                this.childRecognizer.add({
                    path: withChild.route,
                    handler: withChild
                });
                withChild.navModel = navModel;
                withChild.settings = config.settings;
            }
            config.navModel = navModel;
            if ((config.nav || 'order' in navModel) && this.navigation.indexOf(navModel) === -1) {
                navModel.order = navModel.order || config.nav;
                navModel.href = navModel.href || config.href;
                navModel.isActive = false;
                navModel.config = config;
                if (!config.href) {
                    if (state.types.dynamics || state.types.stars) {
                        throw new Error('Invalid route config: dynamic routes must specify an href to be included in the navigation model.');
                    }
                    navModel.relativeHref = config.route;
                    navModel.href = '';
                }
                if (typeof navModel.order != 'number') {
                    navModel.order = ++this.fallbackOrder;
                }
                this.navigation.push(navModel);
                this.navigation = this.navigation.sort(function (a, b) { return a.order - b.order; });
            }
        };
        Router.prototype.hasRoute = function (name) {
            return !!(this.recognizer.hasRoute(name) || this.parent && this.parent.hasRoute(name));
        };
        Router.prototype.hasOwnRoute = function (name) {
            return this.recognizer.hasRoute(name);
        };
        Router.prototype.handleUnknownRoutes = function (config) {
            var callback = function (instruction) { return new Promise(function (resolve, reject) {
                function done(inst) {
                    inst = inst || instruction;
                    inst.config.route = inst.params.path;
                    resolve(inst);
                }
                if (!config) {
                    instruction.config.moduleId = instruction.fragment;
                    done(instruction);
                }
                else if (typeof config == 'string') {
                    instruction.config.moduleId = config;
                    done(instruction);
                }
                else if (typeof config == 'function') {
                    util_1.processPotential(config(instruction), done, reject);
                }
                else {
                    instruction.config = config;
                    done(instruction);
                }
            }); };
            this.catchAllHandler = callback;
        };
        Router.prototype.reset = function () {
            this.fallbackOrder = 100;
            this.recognizer = new index_1.RouteRecognizer();
            this.childRecognizer = new index_1.RouteRecognizer();
            this.routes = [];
            this.isNavigating = false;
            this.navigation = [];
            this.isConfigured = false;
        };
        return Router;
    })();
    exports.Router = Router;
    function validateRouteConfig(config) {
        var isValid = typeof config === 'object'
            && config.moduleId
            && config.route !== null && config.route !== undefined;
        if (!isValid) {
            throw new Error('Invalid route config.');
        }
    }
});

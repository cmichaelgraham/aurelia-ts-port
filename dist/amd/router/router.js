define(["require", "exports", 'aurelia-route-recognizer', './navigation-context', './navigation-instruction', './router-configuration', './util'], function (require, exports, aurelia_route_recognizer_1, navigation_context_1, navigation_instruction_1, router_configuration_1, util_1) {
    var isRootedPath = /^#?\//;
    var isAbsoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;
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
                current.href = this.createRootedPath(current.relativeHref);
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
        Router.prototype.createRootedPath = function (fragment) {
            if (isAbsoluteUrl.test(fragment)) {
                return fragment;
            }
            var path = '';
            if (this.baseUrl.length && this.baseUrl[0] !== '/') {
                path += '/';
            }
            path += this.baseUrl;
            if (path[path.length - 1] != '/' && fragment[0] != '/') {
                path += '/';
            }
            return normalizeAbsolutePath(path + fragment, this.history._hasPushState);
        };
        Router.prototype.navigate = function (fragment, options) {
            if (!this.isConfigured && this.parent) {
                return this.parent.navigate(fragment, options);
            }
            if (fragment === '') {
                fragment = '/';
            }
            if (isRootedPath.test(fragment)) {
                fragment = normalizeAbsolutePath(fragment, this.history._hasPushState);
            }
            else {
                fragment = this.createRootedPath(fragment);
            }
            return this.history.navigate(fragment, options);
        };
        Router.prototype.navigateToRoute = function (route, params, options) {
            var path = this.generate(route, params);
            return this.navigate(path, options);
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
            var fragment = url;
            var queryString = '';
            var queryIndex = url.indexOf('?');
            if (queryIndex != -1) {
                fragment = url.substr(0, queryIndex);
                queryString = url.substr(queryIndex + 1);
            }
            var results = this.recognizer.recognize(url);
            if (!results || !results.length) {
                results = this.childRecognizer.recognize(url);
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
                var first = results[0];
                var instruction = new navigation_instruction_1.NavigationInstruction(fragment, queryString, first.params, first.queryParams || results.queryParams, first.config || first.handler, parentInstruction);
                if (typeof first.handler === 'function') {
                    return evaluateNavigationStrategy(instruction, first.handler, first);
                }
                else if (first.handler && 'navigationStrategy' in first.handler) {
                    return evaluateNavigationStrategy(instruction, first.handler.navigationStrategy, first.handler);
                }
                return Promise.resolve(instruction);
            }
            return Promise.reject(new Error("Route not found: " + url));
        };
        Router.prototype.createNavigationContext = function (instruction) {
            return new navigation_context_1.NavigationContext(this, instruction);
        };
        Router.prototype.generate = function (name, params) {
            if ((!this.isConfigured || !this.recognizer.hasRoute(name)) && this.parent) {
                return this.parent.generate(name, params);
            }
            var path = this.recognizer.generate(name, params);
            return this.createRootedPath(path);
        };
        Router.prototype.addRoute = function (config, navModel) {
            if (navModel === void 0) { navModel = {}; }
            validateRouteConfig(config);
            if (!('viewPorts' in config) && !config.navigationStrategy) {
                config.viewPorts = {
                    'default': {
                        moduleId: config.moduleId,
                        view: config.view
                    }
                };
            }
            navModel.title = navModel.title || config.title;
            navModel.setTitle = function (newTitle) {
                navModel.title = newTitle;
            };
            navModel.settings = config.settings || (config.settings = {});
            this.routes.push(config);
            var state = this.recognizer.add({ path: config.route, handler: config });
            if (config.route) {
                var withChild, settings = config.settings;
                delete config.settings;
                withChild = JSON.parse(JSON.stringify(config));
                config.settings = settings;
                withChild.route += '/*childRoute';
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
            this.recognizer = new aurelia_route_recognizer_1.RouteRecognizer();
            this.childRecognizer = new aurelia_route_recognizer_1.RouteRecognizer();
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
            && (config.moduleId || config.redirect || config.viewPorts)
            && config.route !== null && config.route !== undefined;
        if (!isValid) {
            throw new Error('Invalid Route Config: You must have at least a route and a moduleId, redirect, navigationStrategy or viewPorts.');
        }
    }
    function normalizeAbsolutePath(path, hasPushState) {
        if (!hasPushState && path[0] !== '#') {
            path = '#' + path;
        }
        return path;
    }
    function evaluateNavigationStrategy(instruction, evaluator, context) {
        return Promise.resolve(evaluator.call(context, instruction)).then(function () {
            if (!('viewPorts' in instruction.config)) {
                instruction.config.viewPorts = {
                    'default': {
                        moduleId: instruction.config.moduleId
                    }
                };
            }
            return instruction;
        });
    }
});

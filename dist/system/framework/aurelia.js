System.register(['aurelia-logging', 'aurelia-dependency-injection', 'aurelia-loader', 'aurelia-path', './plugins', '../templating/index'], function(exports_1) {
    var LogManager, aurelia_dependency_injection_1, aurelia_loader_1, aurelia_path_1, plugins_1, index_1;
    var logger, slice, CustomEvent, Aurelia;
    function preventActionlessFormSubmit() {
        document.body.addEventListener('submit', function (evt) {
            var target = evt.target;
            var action = target.action;
            if (target.tagName.toLowerCase() === 'form' && !action) {
                evt.preventDefault();
            }
        });
    }
    function loadResources(container, resourcesToLoad, appResources) {
        var viewEngine = container.get(index_1.ViewEngine), importIds = Object.keys(resourcesToLoad), names = new Array(importIds.length), i, ii;
        for (i = 0, ii = importIds.length; i < ii; ++i) {
            names[i] = resourcesToLoad[importIds[i]];
        }
        return viewEngine.importViewResources(importIds, names, appResources);
    }
    return {
        setters:[
            function (_LogManager) {
                LogManager = _LogManager;
            },
            function (_aurelia_dependency_injection_1) {
                aurelia_dependency_injection_1 = _aurelia_dependency_injection_1;
            },
            function (_aurelia_loader_1) {
                aurelia_loader_1 = _aurelia_loader_1;
            },
            function (_aurelia_path_1) {
                aurelia_path_1 = _aurelia_path_1;
            },
            function (_plugins_1) {
                plugins_1 = _plugins_1;
            },
            function (_index_1) {
                index_1 = _index_1;
            }],
        execute: function() {
            logger = LogManager.getLogger('aurelia'), slice = Array.prototype.slice;
            if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
                CustomEvent = function (event, params) {
                    var params = params || {
                        bubbles: false,
                        cancelable: false,
                        detail: undefined
                    };
                    var evt = document.createEvent("CustomEvent");
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                };
                CustomEvent.prototype = window.Event.prototype;
                window.CustomEvent = CustomEvent;
            }
            /**
             * The framework core that provides the main Aurelia object.
             *
             * @class Aurelia
             * @constructor
             * @param {Loader} loader The loader for this Aurelia instance to use. If a loader is not specified, Aurelia will use a defaultLoader.
             * @param {Container} container The dependency injection container for this Aurelia instance to use. If a container is not specified, Aurelia will create an empty container.
             * @param {ResourceRegistry} resources The resource registry for this Aurelia instance to use. If a resource registry is not specified, Aurelia will create an empty registry.
             */
            Aurelia = (function () {
                function Aurelia(loader, container, resources) {
                    this.loader = loader || new window.AureliaLoader();
                    this.container = container || new aurelia_dependency_injection_1.Container();
                    this.resources = resources || new index_1.ResourceRegistry();
                    this.use = new plugins_1.Plugins(this);
                    this.resourcesToLoad = {};
                    this.withInstance(Aurelia, this);
                    this.withInstance(aurelia_loader_1.Loader, this.loader);
                    this.withInstance(index_1.ResourceRegistry, this.resources);
                }
                /**
                 * Adds an existing object to the framework's dependency injection container.
                 *
                 * @method withInstance
                 * @param {Class} type The object type of the dependency that the framework will inject.
                 * @param {Object} instance The existing instance of the dependency that the framework will inject.
                 * @return {Aurelia} Returns the current Aurelia instance.
                 */
                Aurelia.prototype.withInstance = function (type, instance) {
                    this.container.registerInstance(type, instance);
                    return this;
                };
                /**
                 * Adds a singleton to the framework's dependency injection container.
                 *
                 * @method withSingleton
                 * @param {Class} type The object type of the dependency that the framework will inject.
                 * @param {Object} implementation The constructor function of the dependency that the framework will inject.
                 * @return {Aurelia} Returns the current Aurelia instance.
                 */
                Aurelia.prototype.withSingleton = function (type, implementation) {
                    this.container.registerSingleton(type, implementation);
                    return this;
                };
                /**
                 * Adds globally available view resources to be imported into the Aurelia framework.
                 *
                 * @method globalizeResources
                 * @param {Object|Array} resources The relative module id to the resource. (Relative to the plugin's installer.)
                 * @return {Aurelia} Returns the current Aurelia instance.
                 */
                Aurelia.prototype.globalizeResources = function (resources) {
                    var toAdd = Array.isArray(resources) ? resources : arguments, i, ii, resource, pluginPath = this.currentPluginId || '', path, internalPlugin = pluginPath.startsWith('./');
                    for (i = 0, ii = toAdd.length; i < ii; ++i) {
                        resource = toAdd[i];
                        if (typeof resource != 'string') {
                            throw new Error("Invalid resource path [" + resource + "]. Resources must be specified as relative module IDs.");
                        }
                        path = internalPlugin
                            ? aurelia_path_1.relativeToFile(resource, pluginPath)
                            : aurelia_path_1.join(pluginPath, resource);
                        this.resourcesToLoad[path] = this.resourcesToLoad[path];
                    }
                    return this;
                };
                /**
                 * Renames a global resource that was imported.
                 *
                 * @method renameGlobalResource
                 * @param {String} resourcePath The path to the resource.
                 * @param {String} newName The new name.
                 * @return {Aurelia} Returns the current Aurelia instance.
                 */
                Aurelia.prototype.renameGlobalResource = function (resourcePath, newName) {
                    this.resourcesToLoad[resourcePath] = newName;
                    return this;
                };
                /**
                 * Loads plugins, then resources, and then starts the Aurelia instance.
                 *
                 * @method start
                 * @return {Aurelia} Returns the started Aurelia instance.
                 */
                Aurelia.prototype.start = function () {
                    var _this = this;
                    if (this.started) {
                        return Promise.resolve(this);
                    }
                    this.started = true;
                    logger.info('Aurelia Starting');
                    preventActionlessFormSubmit();
                    return this.use._process().then(function () {
                        if (!_this.container.hasHandler(index_1.BindingLanguage)) {
                            var message = 'You must configure Aurelia with a BindingLanguage implementation.';
                            logger.error(message);
                            throw new Error(message);
                        }
                        if (!_this.container.hasHandler(index_1.Animator)) {
                            index_1.Animator.configureDefault(_this.container);
                        }
                        return loadResources(_this.container, _this.resourcesToLoad, _this.resources).then(function () {
                            logger.info('Aurelia Started');
                            var evt = new window.CustomEvent('aurelia-started', { bubbles: true, cancelable: true });
                            document.dispatchEvent(evt);
                            return _this;
                        });
                    });
                };
                /**
                 * Instantiates the root view-model and view and add them to the DOM.
                 *
                 * @method withSingleton
                 * @param {Object} root The root view-model to load upon bootstrap.
                 * @param {string|Object} applicationHost The DOM object that Aurelia will attach to.
                 * @return {Aurelia} Returns the current Aurelia instance.
                 */
                Aurelia.prototype.setRoot = function (root, applicationHost) {
                    var _this = this;
                    if (root === void 0) { root = 'app'; }
                    if (applicationHost === void 0) { applicationHost = null; }
                    var compositionEngine, instruction = {};
                    applicationHost = applicationHost || this.host;
                    if (!applicationHost || typeof applicationHost == 'string') {
                        this.host = document.getElementById(applicationHost || 'applicationHost') || document.body;
                    }
                    else {
                        this.host = applicationHost;
                    }
                    this.host.aurelia = this;
                    compositionEngine = this.container.get(index_1.CompositionEngine);
                    instruction.viewModel = root;
                    instruction.container = instruction.childContainer = this.container;
                    instruction.viewSlot = new index_1.ViewSlot(this.host, true);
                    instruction.viewSlot.transformChildNodesIntoView();
                    instruction.host = this.host;
                    return compositionEngine.compose(instruction).then(function (root) {
                        _this.root = root;
                        instruction.viewSlot.attached();
                        var evt = new window.CustomEvent('aurelia-composed', { bubbles: true, cancelable: true });
                        setTimeout(function () { return document.dispatchEvent(evt); }, 1);
                        return _this;
                    });
                };
                return Aurelia;
            })();
            exports_1("Aurelia", Aurelia);
        }
    }
});

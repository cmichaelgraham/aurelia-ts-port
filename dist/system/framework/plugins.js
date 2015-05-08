System.register(['aurelia-logging'], function(exports_1) {
    var LogManager;
    var logger, Plugins;
    function loadPlugin(aurelia, loader, info) {
        logger.debug("Loading plugin " + info.moduleId + ".");
        aurelia.currentPluginId = info.moduleId;
        return loader.loadModule(info.moduleId).then(function (m) {
            if ('configure' in m) {
                return Promise.resolve(m.configure(aurelia, info.config || {})).then(function () {
                    aurelia.currentPluginId = null;
                    logger.debug("Configured plugin " + info.moduleId + ".");
                });
            }
            else {
                aurelia.currentPluginId = null;
                logger.debug("Loaded plugin " + info.moduleId + ".");
            }
        });
    }
    return {
        setters:[
            function (_LogManager) {
                LogManager = _LogManager;
            }],
        execute: function() {
            logger = LogManager.getLogger('aurelia');
            /**
             * Manages loading and configuring plugins.
             *
             * @class Plugins
             * @constructor
             * @param {Aurelia} aurelia An instance of Aurelia.
             */
            Plugins = (function () {
                function Plugins(aurelia) {
                    this.aurelia = aurelia;
                    this.info = [];
                    this.processed = false;
                }
                /**
                 * Configures a plugin before Aurelia starts.
                 *
                 * @method plugin
                 * @param {moduleId} moduleId The ID of the module to configure.
                 * @param {config} config The configuration for the specified module.
                 * @return {Plugins} Returns the current Plugins instance.
               */
                Plugins.prototype.plugin = function (moduleId, config) {
                    var plugin = { moduleId: moduleId, config: config || {} };
                    if (this.processed) {
                        loadPlugin(this.aurelia, this.aurelia.loader, plugin);
                    }
                    else {
                        this.info.push(plugin);
                    }
                    return this;
                };
                Plugins.prototype._process = function () {
                    var _this = this;
                    var aurelia = this.aurelia, loader = aurelia.loader, info = this.info, current;
                    if (this.processed) {
                        return;
                    }
                    var next = function () {
                        if (current = info.shift()) {
                            return loadPlugin(aurelia, loader, current).then(next);
                        }
                        _this.processed = true;
                        return Promise.resolve();
                    };
                    return next();
                };
                return Plugins;
            })();
            exports_1("Plugins", Plugins);
        }
    }
});

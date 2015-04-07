define(["require", "exports", '../logging/index', '../metadata/index'], function (require, exports, LogManager, index_1) {
    var logger = LogManager.getLogger('aurelia');
    function loadPlugin(aurelia, loader, info) {
        logger.debug("Loading plugin " + info.moduleId + ".");
        aurelia.currentPluginId = info.moduleId;
        return loader.loadModule(info.moduleId).then(function (exportedValue) {
            if ('install' in exportedValue) {
                var result = exportedValue.install(aurelia, info.config || {});
                if (result) {
                    return result.then(function () {
                        aurelia.currentPluginId = null;
                        logger.debug("Installed plugin " + info.moduleId + ".");
                    });
                }
                else {
                    logger.debug("Installed plugin " + info.moduleId + ".");
                }
            }
            else {
                logger.debug("Loaded plugin " + info.moduleId + ".");
            }
            aurelia.currentPluginId = null;
        });
    }
    /**
     * Manages loading and installing plugins.
     *
     * @class Plugins
     * @constructor
     * @param {Aurelia} aurelia An instance of Aurelia.
     */
    var Plugins = (function () {
        function Plugins(aurelia) {
            this.aurelia = aurelia;
            this.info = [];
            this.processed = false;
        }
        /**
         * Installs a plugin before Aurelia starts.
         *
         * @method plugin
         * @param {moduleId} moduleId The ID of the module to install.
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
        /**
         * Installs special support for ES5 authoring.
         *
         * @method es5
         * @return {Plugins} Returns the current Plugins instance.
       */
        Plugins.prototype.es5 = function () {
            Function.prototype.computed = function (computedProperties) {
                for (var key in computedProperties) {
                    if (computedProperties.hasOwnProperty(key)) {
                        Object.defineProperty(this.prototype, key, { get: computedProperties[key], enumerable: true });
                    }
                }
            };
            return this;
        };
        /**
         * Installs special support for AtScript authoring.
         *
         * @method atscript
         * @return {Plugins} Returns the current Plugins instance.
       */
        Plugins.prototype.atscript = function () {
            this.aurelia.container.supportAtScript();
            index_1.Metadata.configure.locator(function (fn, meta) {
                var annotations = fn['annotate'] || fn['annotations'], i, ii;
                if (annotations && annotations.length) {
                    for (i = 0, ii = annotations.length; i < ii; ++i) {
                        meta.add(annotations[i]);
                    }
                }
            });
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
    exports.Plugins = Plugins;
});

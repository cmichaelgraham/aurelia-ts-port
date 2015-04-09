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
define(["require", "exports", '../logging/index'], function (require, exports, LogManager) {
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

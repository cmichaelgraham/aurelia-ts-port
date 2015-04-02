define(["require", "exports", '../templating/index', '../logging/index'], function (require, exports, _index, LogManager) {
    var GlobalBehavior = (function () {
        function GlobalBehavior(element) {
            this.element = element;
        }
        GlobalBehavior.metadata = function () {
            return _index.Behavior.attachedBehavior('global-behavior').withOptions().and(function (x) {
                return x.dynamic();
            });
        };
        GlobalBehavior.inject = function () {
            return [
                Element
            ];
        };
        GlobalBehavior.prototype.bind = function () {
            var handler = GlobalBehavior.handlers[this.aureliaAttrName];
            if (!handler) {
                throw new Error("Conventional binding handler not found for " + this.aureliaAttrName + ".");
            }
            try {
                this.handler = handler.bind(this, this.element, this.aureliaCommand) || handler;
            }
            catch (error) {
                throw new Error('Conventional binding handler failed.', error);
            }
        };
        GlobalBehavior.prototype.attached = function () {
            if (this.handler && 'attached' in this.handler) {
                this.handler.attached(this, this.element);
            }
        };
        GlobalBehavior.prototype.detached = function () {
            if (this.handler && 'detached' in this.handler) {
                this.handler.detached(this, this.element);
            }
        };
        GlobalBehavior.prototype.unbind = function () {
            if (this.handler && 'unbind' in this.handler) {
                this.handler.unbind(this, this.element);
            }
            this.handler = null;
        };
        return GlobalBehavior;
    })();
    exports.GlobalBehavior = GlobalBehavior;
    GlobalBehavior.createSettingsFromBehavior = function (behavior) {
        var settings = {};
        for (var key in behavior) {
            if (key === 'aureliaAttrName' || key === 'aureliaCommand' || !behavior.hasOwnProperty(key)) {
                continue;
            }
            settings[key] = behavior[key];
        }
        return settings;
    };
    GlobalBehavior.jQueryPlugins = {};
    GlobalBehavior.handlers = {
        jquery: {
            bind: function (behavior, element, command) {
                var settings = GlobalBehavior.createSettingsFromBehavior(behavior);
                var pluginName = GlobalBehavior.jQueryPlugins[command] || command;
                var jqueryElement = window.jQuery(element);
                if (!jqueryElement[pluginName]) {
                    LogManager.getLogger('templating-resources').warn("Could not find the jQuery plugin " + pluginName + ", possibly due to case mismatch. Trying to enumerate jQuery methods in lowercase. Add the correctly cased plugin name to the GlobalBehavior to avoid this performance hit.");
                    for (var prop in jqueryElement) {
                        if (prop.toLowerCase() === pluginName) {
                            pluginName = prop;
                        }
                    }
                }
                behavior.plugin = jqueryElement[pluginName](settings);
            },
            unbind: function (behavior, element) {
                if (typeof behavior.plugin.destroy === 'function') {
                    behavior.plugin.destroy();
                    behavior.plugin = null;
                }
            }
        }
    };
});

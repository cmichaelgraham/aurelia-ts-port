if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-logging', 'aurelia-logging'], function (require, exports, aurelia_dependency_injection_1, aurelia_templating_1, aurelia_logging_1, LogManager) {
    var GlobalBehavior = (function () {
        function GlobalBehavior(element) {
            this.element = element;
        }
        GlobalBehavior.prototype.bind = function () {
            var handler = GlobalBehavior.handlers[this.aureliaAttrName];
            if (!handler) {
                throw new Error("Conventional binding handler not found for " + this.aureliaAttrName + ".");
            }
            try {
                this.handler = handler.bind(this, this.element, this.aureliaCommand) || handler;
            }
            catch (error) {
                throw aurelia_logging_1.AggregateError('Conventional binding handler failed.', error);
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
        GlobalBehavior = __decorate([
            aurelia_templating_1.customAttribute('global-behavior'),
            aurelia_templating_1.dynamicOptions,
            aurelia_dependency_injection_1.inject(Element), 
            __metadata('design:paramtypes', [Object])
        ], GlobalBehavior);
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
                    LogManager.getLogger('templating-resources')
                        .warn("Could not find the jQuery plugin " + pluginName + ", possibly due to case mismatch. Trying to enumerate jQuery methods in lowercase. Add the correctly cased plugin name to the GlobalBehavior to avoid this performance hit.");
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

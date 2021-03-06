var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-dependency-injection';
import { customAttribute, dynamicOptions } from 'aurelia-templating';
import { AggregateError } from 'aurelia-logging';
import * as LogManager from 'aurelia-logging';
export let GlobalBehavior = class {
    constructor(element) {
        this.element = element;
    }
    bind() {
        var handler = GlobalBehavior.handlers[this.aureliaAttrName];
        if (!handler) {
            throw new Error(`Binding handler not found for '${this.aureliaAttrName}.${this.aureliaCommand}'. Element:\n${this.element.outerHTML}\n`);
        }
        try {
            this.handler = handler.bind(this, this.element, this.aureliaCommand) || handler;
        }
        catch (error) {
            throw AggregateError('Conventional binding handler failed.', error);
        }
    }
    attached() {
        if (this.handler && 'attached' in this.handler) {
            this.handler.attached(this, this.element);
        }
    }
    detached() {
        if (this.handler && 'detached' in this.handler) {
            this.handler.detached(this, this.element);
        }
    }
    unbind() {
        if (this.handler && 'unbind' in this.handler) {
            this.handler.unbind(this, this.element);
        }
        this.handler = null;
    }
};
GlobalBehavior = __decorate([
    customAttribute('global-behavior'),
    dynamicOptions,
    inject(Element), 
    __metadata('design:paramtypes', [Object])
], GlobalBehavior);
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
        bind(behavior, element, command) {
            var settings = GlobalBehavior.createSettingsFromBehavior(behavior);
            var pluginName = GlobalBehavior.jQueryPlugins[command] || command;
            var jqueryElement = window.jQuery(element);
            if (!jqueryElement[pluginName]) {
                LogManager.getLogger('templating-resources')
                    .warn(`Could not find the jQuery plugin ${pluginName}, possibly due to case mismatch. Trying to enumerate jQuery methods in lowercase. Add the correctly cased plugin name to the GlobalBehavior to avoid this performance hit.`);
                for (var prop in jqueryElement) {
                    if (prop.toLowerCase() === pluginName) {
                        pluginName = prop;
                    }
                }
            }
            behavior.plugin = jqueryElement[pluginName](settings);
        },
        unbind(behavior, element) {
            if (typeof behavior.plugin.destroy === 'function') {
                behavior.plugin.destroy();
                behavior.plugin = null;
            }
        }
    }
};

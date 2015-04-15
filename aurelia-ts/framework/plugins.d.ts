/**
 * Manages loading and installing plugins.
 *
 * @class Plugins
 * @constructor
 * @param {Aurelia} aurelia An instance of Aurelia.
 */
export declare class Plugins {
    aurelia: any;
    info: any;
    processed: any;
    constructor(aurelia: any);
    /**
     * Installs a plugin before Aurelia starts.
     *
     * @method plugin
     * @param {moduleId} moduleId The ID of the module to install.
     * @param {config} config The configuration for the specified module.
     * @return {Plugins} Returns the current Plugins instance.
   */
    plugin(moduleId: any, config: any): Plugins;
    /**
     * Installs special support for ES5 authoring.
     *
     * @method es5
     * @return {Plugins} Returns the current Plugins instance.
   */
    es5(): Plugins;
    _process(): any;
}

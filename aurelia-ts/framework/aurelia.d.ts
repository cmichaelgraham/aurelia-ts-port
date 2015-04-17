/**
 * The framework core that provides the main Aurelia object.
 *
 * @class Aurelia
 * @constructor
 * @param {Loader} loader The loader for this Aurelia instance to use. If a loader is not specified, Aurelia will use a defaultLoader.
 * @param {Container} container The dependency injection container for this Aurelia instance to use. If a container is not specified, Aurelia will create an empty container.
 * @param {ResourceRegistry} resources The resource registry for this Aurelia instance to use. If a resource registry is not specified, Aurelia will create an empty registry.
 */
export declare class Aurelia {
    loader: any;
    container: any;
    resources: any;
    use: any;
    resourcesToLoad: any;
    currentPluginId: any;
    started: any;
    host: any;
    root: any;
    constructor(loader?: any, container?: any, resources?: any);
    /**
     * Adds an existing object to the framework's dependency injection container.
     *
     * @method withInstance
     * @param {Class} type The object type of the dependency that the framework will inject.
     * @param {Object} instance The existing instance of the dependency that the framework will inject.
     * @return {Aurelia} Returns the current Aurelia instance.
     */
    withInstance(type: any, instance: any): Aurelia;
    /**
     * Adds a singleton to the framework's dependency injection container.
     *
     * @method withSingleton
     * @param {Class} type The object type of the dependency that the framework will inject.
     * @param {Object} implementation The constructor function of the dependency that the framework will inject.
     * @return {Aurelia} Returns the current Aurelia instance.
     */
    withSingleton(type: any, implementation: any): Aurelia;
    /**
     * Adds globally available view resources to be imported into the Aurelia framework.
     *
     * @method globalizeResources
     * @param {Object|Array} resources The relative module id to the resource. (Relative to the plugin's installer.)
     * @return {Aurelia} Returns the current Aurelia instance.
     */
    globalizeResources(resources: any): Aurelia;
    /**
     * Renames a global resource that was imported.
     *
     * @method renameGlobalResource
     * @param {String} resourcePath The path to the resource.
     * @param {String} newName The new name.
     * @return {Aurelia} Returns the current Aurelia instance.
     */
    renameGlobalResource(resourcePath: any, newName: any): Aurelia;
    /**
     * Loads plugins, then resources, and then starts the Aurelia instance.
     *
     * @method start
     * @return {Aurelia} Returns the started Aurelia instance.
     */
    start(): any;
    /**
     * Instantiates the root view-model and view and add them to the DOM.
     *
     * @method withSingleton
     * @param {Object} root The root view-model to load upon bootstrap.
     * @param {string|Object} applicationHost The DOM object that Aurelia will attach to.
     * @return {Aurelia} Returns the current Aurelia instance.
     */
    setRoot(root?: string, applicationHost?: any): any;
}

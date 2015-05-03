declare module 'aurelia-metadata/metadata' {
	/**
	* Provides helpers for working with metadata.
	*
	* @class Metadata
	* @static
	*/
	export var Metadata: {
	    resource: string;
	    paramTypes: string;
	    properties: string;
	    get(metadataKey: any, target: any, propertyKey?: any): any;
	    getOwn(metadataKey: any, target: any, propertyKey?: any): any;
	    getOrCreateOwn(metadataKey: any, Type: any, target: any, propertyKey?: any): any;
	};

}
declare module 'aurelia-metadata/decorator-applicator' {
	export class DecoratorApplicator {
	    private _first;
	    private _second;
	    private _third;
	    private _rest;
	    constructor();
	    decorator(decorator: any): DecoratorApplicator;
	    _decorate(target: any): void;
	}

}
declare module 'aurelia-metadata/decorators' {
	export var Decorators: {
	    configure: {
	        parameterizedDecorator(name: any, decorator: any): void;
	        simpleDecorator(name: any, decorator: any): void;
	    };
	};

}
declare module 'aurelia-metadata/origin' {
	/**
	* A metadata annotation that describes the origin module of the function to which it's attached.
	*
	* @class Origin
	* @constructor
	* @param {string} moduleId The origin module id.
	* @param {string} moduleMember The name of the export in the origin module.
	*/
	export class Origin {
	    moduleId: any;
	    moduleMember: any;
	    constructor(moduleId: any, moduleMember?: any);
	    /**
	    * Get the Origin annotation for the specified function.
	    *
	    * @method get
	    * @static
	    * @param {Function} fn The function to inspect for Origin metadata.
	    * @return {Origin} Returns the Origin metadata.
	    */
	    static get(fn: any): {};
	    /**
	    * Set the Origin annotation for the specified function.
	    *
	    * @method set
	    * @static
	    * @param {Function} fn The function to set the Origin metadata on.
	    * @param {origin} fn The Origin metadata to store on the function.
	    * @return {Origin} Returns the Origin metadata.
	    */
	    static set(fn: any, origin: any): void;
	}

}
declare module 'aurelia-metadata/index' {
	/**
	 * Utilities for reading and writing the metadata of JavaScript functions.
	 *
	 * @module metadata
	 */
	export { Origin } from 'aurelia-metadata/origin';
	export { Metadata } from 'aurelia-metadata/metadata';
	export { Decorators } from 'aurelia-metadata/decorators';

}
declare module 'aurelia-metadata/resource-type' {
	/**
	* An abstract base class used to designate resources which can be loaded and registered in a framework.
	*
	* @class ResourceType
	* @constructor
	*/
	export class ResourceType {
	    constructor();
	    /**
	    * Implemented by resource metadata to allow it to self-configure and load dependencies.
	    *
	    * @method load
	    * @param {Container} container The dependency injection container to use for service resolution.
	    * @param {Object} target The target that is decorated by this ResourceType metadata.
	    * @return {Promise} Returns a promise for itself, resolving when all dependent resources are loaded.
	    */
	    load(container: any, target: any): Promise<ResourceType>;
	    /**
	    * Implemented by resources to allow them to register themselved in a resource registry.
	    *
	    * @method register
	    * @param {ResourceRegistry} registry The resource registry that this resource needs to be registered in.
	    * @param {String} [name] A possible name override for the resource.
	    */
	    register(registry: any, name: any): void;
	}

}
declare module 'aurelia-metadata' {
	export * from 'aurelia-metadata/index';
}

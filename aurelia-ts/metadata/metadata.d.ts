/**
* Stores metadata and provides helpers for searching and adding to it.
*
* @class MetadataStore
*/
export declare class MetadataStore {
    private _owner;
    private _first;
    private _second;
    private _third;
    private _rest;
    constructor(owner?: any);
    /**
    * Searches metadata and returns the first instance of a particular type.
    *
    * @method first
    * @param {Function} type The metadata type to look for.
    * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
    * @return {Object} Returns an instance of the specified metadata type if found; otherwise null.
    */
    first(type: any, searchPrototype: any): any;
    /**
    * Searches metadata and returns true if a particular type of metadata is present.
    *
    * @method has
    * @param {Function} type The metadata type to look for.
    * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
    * @return {Object} Returns true if found; false null.
    */
    has(type: any, searchPrototype: any): boolean;
    /**
    * Searches metadata for all instances of a particular type.
    *
    * @method all
    * @param {Function} type The metadata type to look for.
    * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
    * @return {Array} Returns an array of the specified metadata type.
    */
    all(type: any, searchPrototype: any): any[];
    /**
    * Searches metadata and returns the first instance of a particular type or creates and adds one if none is found.
    *
    * @method first
    * @param {Function} type The metadata type to look for.
    * @param {Boolean} searchPrototype Indicates whether or not to search the inheritance hierarchy for metadata.
    * @return {Object} Returns an instance of the specified metadata type.
    */
    firstOrAdd(type: any, searchPrototype: any): any;
    /**
    * Adds metadata.
    *
    * @method add
    * @param {Object} instance The metadata instance to add.
    */
    add(instance: any): MetadataStore;
}
/**
* Provides access to metadata.
*
* @class Metadata
* @static
*/
export declare var Metadata: {
    none: MetadataStore;
    on(owner: any): any;
    configure: any;
};

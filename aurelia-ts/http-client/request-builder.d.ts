/**
* A builder class allowing fluent composition of HTTP requests.
*
* @class RequestBuilder
* @constructor
*/
export declare class RequestBuilder {
    client: any;
    transformers: any;
    useJsonp: any;
    constructor(client: any);
    /**
    * Adds a user-defined request transformer to the RequestBuilder.
    *
    * @method addHelper
    * @param {String} name The name of the helper to add.
    * @param {Function} fn The helper function.
    * @chainable
    */
    static addHelper(name: any, fn: any): void;
    /**
    * Sends the request.
    *
    * @method send
    * @return {Promise} A cancellable promise object.
    */
    send(): any;
}

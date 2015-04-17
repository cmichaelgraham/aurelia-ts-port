declare module 'aurelia-http-client/headers' {
	export class Headers {
	    headers: any;
	    constructor(headers?: {});
	    add(key: any, value: any): void;
	    get(key: any): any;
	    clear(): void;
	    configureXHR(xhr: any): void;
	    /**
	     * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
	     * headers according to the format described here:
	     * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
	     * This method parses that string into a user-friendly key/value pair object.
	     */
	    static parse(headerStr: any): Headers;
	}

}
declare module 'aurelia-http-client/http-response-message' {
	export class HttpResponseMessage {
	    requestMessage: any;
	    statusCode: any;
	    response: any;
	    isSuccess: any;
	    statusText: any;
	    reviver: any;
	    mimeType: any;
	    responseType: any;
	    headers: any;
	    private _content;
	    constructor(requestMessage: any, xhr: any, responseType: any, reviver?: any);
	    content: any;
	}
	/**
	 * MimeTypes mapped to responseTypes
	 *
	 * @type {Object}
	 */
	export var mimeTypes: {
	    "text/html": string;
	    "text/javascript": string;
	    "application/javascript": string;
	    "text/json": string;
	    "application/json": string;
	    "application/rss+xml": string;
	    "application/atom+xml": string;
	    "application/xhtml+xml": string;
	    "text/markdown": string;
	    "text/xml": string;
	    "text/mathml": string;
	    "application/xml": string;
	    "text/yml": string;
	    "text/csv": string;
	    "text/css": string;
	    "text/less": string;
	    "text/stylus": string;
	    "text/scss": string;
	    "text/sass": string;
	    "text/plain": string;
	};

}
declare module 'aurelia-http-client/request-message-processor' {
	export class RequestMessageProcessor {
	    XHRType: any;
	    transformers: any;
	    xhr: any;
	    constructor(xhrType: any, transformers: any);
	    abort(): void;
	    process(client: any, message: any): Promise<{}>;
	}

}
declare module 'aurelia-http-client/transformers' {
	export function timeoutTransformer(client: any, processor: any, message: any, xhr: any): void;
	export function callbackParameterNameTransformer(client: any, processor: any, message: any, xhr: any): void;
	export function credentialsTransformer(client: any, processor: any, message: any, xhr: any): void;
	export function progressTransformer(client: any, processor: any, message: any, xhr: any): void;
	export function responseTypeTransformer(client: any, processor: any, message: any, xhr: any): void;
	export function headerTransformer(client: any, processor: any, message: any, xhr: any): void;
	export function contentTransformer(client: any, processor: any, message: any, xhr: any): void;

}
declare module 'aurelia-http-client/http-request-message' {
	import { RequestMessageProcessor } from 'aurelia-http-client\request-message-processor';
	export class HttpRequestMessage {
	    method: any;
	    uri: any;
	    content: any;
	    headers: any;
	    responseType: any;
	    constructor(method?: any, uri?: any, content?: any, headers?: any);
	}
	export function createHttpRequestMessageProcessor(): RequestMessageProcessor;

}
declare module 'aurelia-http-client/jsonp-request-message' {
	import { RequestMessageProcessor } from 'aurelia-http-client\request-message-processor';
	export class JSONPRequestMessage {
	    method: any;
	    uri: any;
	    content: any;
	    headers: any;
	    responseType: any;
	    callbackParameterName: any;
	    constructor(uri?: any, callbackParameterName?: any);
	}
	export function createJSONPRequestMessageProcessor(): RequestMessageProcessor;

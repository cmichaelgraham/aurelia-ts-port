export declare class HttpResponseMessage {
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
export declare var mimeTypes: {
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

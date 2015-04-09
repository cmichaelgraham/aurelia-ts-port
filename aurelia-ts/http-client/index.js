/**
 * An extensible HTTP client provided by Aurelia.
 *
 * @module HttpClient
 */
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", './http-client', './http-request-message', './http-response-message', './jsonp-request-message', './headers', './request-builder'], function (require, exports, http_client_1, http_request_message_1, http_response_message_1, jsonp_request_message_1, headers_1, request_builder_1) {
    exports.HttpClient = http_client_1.HttpClient;
    exports.HttpRequestMessage = http_request_message_1.HttpRequestMessage;
    exports.HttpResponseMessage = http_response_message_1.HttpResponseMessage;
    exports.mimeTypes = http_response_message_1.mimeTypes;
    exports.JSONPRequestMessage = jsonp_request_message_1.JSONPRequestMessage;
    exports.Headers = headers_1.Headers;
    exports.RequestBuilder = request_builder_1.RequestBuilder;
});

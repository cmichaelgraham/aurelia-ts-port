/**
 * An extensible HTTP client provided by Aurelia.
 *
 * @module HttpClient
 */
define(["require", "exports", './http-client', './http-request-message', './http-response-message', './jsonp-request-message', './headers', './request-builder'], function (require, exports, _http_client, _http_request_message, _http_response_message, _jsonp_request_message, _headers, _request_builder) {
    exports.HttpClient = _http_client.HttpClient;
    exports.HttpRequestMessage = _http_request_message.HttpRequestMessage;
    exports.HttpResponseMessage = _http_response_message.HttpResponseMessage;
    exports.JSONPRequestMessage = _jsonp_request_message.JSONPRequestMessage;
    exports.Headers = _headers.Headers;
    exports.RequestBuilder = _request_builder.RequestBuilder;
});

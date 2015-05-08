/**
 * An extensible HTTP client provided by Aurelia.
 *
 * @module HttpClient
 */
System.register(['./http-client', './http-request-message', './http-response-message', './jsonp-request-message', './headers', './request-builder'], function(exports_1) {
    return {
        setters:[
            function (_http_client_1) {
                exports_1("HttpClient", _http_client_1["HttpClient"]);
            },
            function (_http_request_message_1) {
                exports_1("HttpRequestMessage", _http_request_message_1["HttpRequestMessage"]);
            },
            function (_http_response_message_1) {
                exports_1("HttpResponseMessage", _http_response_message_1["HttpResponseMessage"]);
                exports_1("mimeTypes", _http_response_message_1["mimeTypes"]);
            },
            function (_jsonp_request_message_1) {
                exports_1("JSONPRequestMessage", _jsonp_request_message_1["JSONPRequestMessage"]);
            },
            function (_headers_1) {
                exports_1("Headers", _headers_1["Headers"]);
            },
            function (_request_builder_1) {
                exports_1("RequestBuilder", _request_builder_1["RequestBuilder"]);
            }],
        execute: function() {
        }
    }
});

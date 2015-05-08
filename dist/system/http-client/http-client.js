System.register(['./request-builder', './http-request-message', './jsonp-request-message'], function(exports_1) {
    var request_builder_1, http_request_message_1, jsonp_request_message_1;
    var HttpClient;
    function trackRequestStart(client, processor) {
        client.pendingRequests.push(processor);
        client.isRequesting = true;
    }
    function trackRequestEnd(client, processor) {
        var index = client.pendingRequests.indexOf(processor);
        client.pendingRequests.splice(index, 1);
        client.isRequesting = client.pendingRequests.length > 0;
        if (!client.isRequesting) {
            var evt = new window.CustomEvent('aurelia-http-client-requests-drained', { bubbles: true, cancelable: true });
            setTimeout(function () { return document.dispatchEvent(evt); }, 1);
        }
    }
    return {
        setters:[
            function (_request_builder_1) {
                request_builder_1 = _request_builder_1;
            },
            function (_http_request_message_1) {
                http_request_message_1 = _http_request_message_1;
            },
            function (_jsonp_request_message_1) {
                jsonp_request_message_1 = _jsonp_request_message_1;
            }],
        execute: function() {
            /**
            * The main HTTP client object.
            *
            * @class HttpClient
            * @constructor
            */
            HttpClient = (function () {
                function HttpClient() {
                    this.requestTransformers = [];
                    this.requestProcessorFactories = new Map();
                    this.requestProcessorFactories.set(http_request_message_1.HttpRequestMessage, http_request_message_1.createHttpRequestMessageProcessor);
                    this.requestProcessorFactories.set(jsonp_request_message_1.JSONPRequestMessage, jsonp_request_message_1.createJSONPRequestMessageProcessor);
                    this.pendingRequests = [];
                    this.isRequesting = false;
                }
                /**
                 * Configure this HttpClient with default settings to be used by all requests.
                 *
                 * @method configure
                 * @param {Function} fn A function that takes a RequestBuilder as an argument.
                 * @chainable
                 */
                HttpClient.prototype.configure = function (fn) {
                    var builder = new request_builder_1.RequestBuilder(this);
                    fn(builder);
                    this.requestTransformers = builder.transformers;
                    return this;
                };
                /**
                 * Returns a new RequestBuilder for this HttpClient instance that can be used to build and send HTTP requests.
                 *
                 * @method createRequest
                 * @param uri The target URI.
                 * @type RequestBuilder
                 */
                HttpClient.prototype.createRequest = function (uri) {
                    var builder = new request_builder_1.RequestBuilder(this);
                    if (uri) {
                        builder.withUri(uri);
                    }
                    return builder;
                };
                /**
                 * Sends a message using the underlying networking stack.
                 *
                 * @method send
                 * @param message A configured HttpRequestMessage or JSONPRequestMessage.
                 * @param {Array} transformers A collection of transformers to apply to the HTTP request.
                 * @return {Promise} A cancellable promise object.
                 */
                HttpClient.prototype.send = function (message, transformers) {
                    var _this = this;
                    var createProcessor = this.requestProcessorFactories.get(message.constructor), processor, promise, i, ii;
                    if (!createProcessor) {
                        throw new Error("No request message processor factory for " + message.constructor + ".");
                    }
                    processor = createProcessor();
                    trackRequestStart(this, processor);
                    transformers = transformers || this.requestTransformers;
                    for (i = 0, ii = transformers.length; i < ii; ++i) {
                        transformers[i](this, processor, message);
                    }
                    promise = processor.process(this, message).then(function (response) {
                        trackRequestEnd(_this, processor);
                        return response;
                    }).catch(function (response) {
                        trackRequestEnd(_this, processor);
                        throw response;
                    });
                    promise.abort = promise.cancel = function () {
                        processor.abort();
                    };
                    return promise;
                };
                /**
                 * Sends an HTTP DELETE request.
                 *
                 * @method delete
                 * @param {String} uri The target URI.
                 * @return {Promise} A cancellable promise object.
                 */
                HttpClient.prototype.delete = function (uri) {
                    return this.createRequest(uri).asDelete().send();
                };
                /**
                 * Sends an HTTP GET request.
                 *
                 * @method get
                 * @param {String} uri The target URI.
                 * @return {Promise} A cancellable promise object.
                 */
                HttpClient.prototype.get = function (uri) {
                    return this.createRequest(uri).asGet().send();
                };
                /**
                 * Sends an HTTP HEAD request.
                 *
                 * @method head
                 * @param {String} uri The target URI.
                 * @return {Promise} A cancellable promise object.
                 */
                HttpClient.prototype.head = function (uri) {
                    return this.createRequest(uri).asHead().send();
                };
                /**
                 * Sends a JSONP request.
                 *
                 * @method jsonp
                 * @param {String} uri The target URI.
                 * @return {Promise} A cancellable promise object.
                 */
                HttpClient.prototype.jsonp = function (uri, callbackParameterName) {
                    if (callbackParameterName === void 0) { callbackParameterName = 'jsoncallback'; }
                    return this.createRequest(uri).asJsonp(callbackParameterName).send();
                };
                /**
                 * Sends an HTTP OPTIONS request.
                 *
                 * @method options
                 * @param {String} uri The target URI.
                 * @return {Promise} A cancellable promise object.
                 */
                HttpClient.prototype.options = function (uri) {
                    return this.createRequest(uri).asOptions().send();
                };
                /**
                 * Sends an HTTP PUT request.
                 *
                 * @method put
                 * @param {String} uri The target URI.
                 * @param {Object} uri The request payload.
                 * @return {Promise} A cancellable promise object.
                 */
                HttpClient.prototype.put = function (uri, content) {
                    return this.createRequest(uri).asPut().withContent(content).send();
                };
                /**
                 * Sends an HTTP PATCH request.
                 *
                 * @method patch
                 * @param {String} uri The target URI.
                 * @param {Object} uri The request payload.
                 * @return {Promise} A cancellable promise object.
                 */
                HttpClient.prototype.patch = function (uri, content) {
                    return this.createRequest(uri).asPatch().withContent(content).send();
                };
                /**
                 * Sends an HTTP POST request.
                 *
                 * @method post
                 * @param {String} uri The target URI.
                 * @param {Object} uri The request payload.
                 * @return {Promise} A cancellable promise object.
                 */
                HttpClient.prototype.post = function (uri, content) {
                    return this.createRequest(uri).asPost().withContent(content).send();
                };
                return HttpClient;
            })();
            exports_1("HttpClient", HttpClient);
        }
    }
});

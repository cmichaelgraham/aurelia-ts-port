var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", './headers', './request-message-processor', './transformers'], function (require, exports, headers_1, request_message_processor_1, transformers_1) {
    var HttpRequestMessage = (function () {
        function HttpRequestMessage(method, uri, content, headers) {
            this.method = method;
            this.uri = uri;
            this.content = content;
            this.headers = headers || new headers_1.Headers();
            this.responseType = 'json'; //text, arraybuffer, blob, document
        }
        return HttpRequestMessage;
    })();
    exports.HttpRequestMessage = HttpRequestMessage;
    function createHttpRequestMessageProcessor() {
        return new request_message_processor_1.RequestMessageProcessor(XMLHttpRequest, [
            transformers_1.timeoutTransformer,
            transformers_1.credentialsTransformer,
            transformers_1.progressTransformer,
            transformers_1.responseTypeTransformer,
            transformers_1.headerTransformer,
            transformers_1.contentTransformer
        ]);
    }
    exports.createHttpRequestMessageProcessor = createHttpRequestMessageProcessor;
});

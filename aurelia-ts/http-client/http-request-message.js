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

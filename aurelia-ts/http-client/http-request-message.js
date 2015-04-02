define(["require", "exports", './headers', './request-message-processor', './transformers'], function (require, exports, _headers, _request_message_processor, _transformers) {
    var HttpRequestMessage = (function () {
        function HttpRequestMessage(method, uri, content, headers) {
            this.method = method;
            this.uri = uri;
            this.content = content;
            this.headers = headers || new _headers.Headers();
            this.responseType = 'json'; //text, arraybuffer, blob, document
        }
        return HttpRequestMessage;
    })();
    exports.HttpRequestMessage = HttpRequestMessage;
    function createHttpRequestMessageProcessor() {
        return new _request_message_processor.RequestMessageProcessor(XMLHttpRequest, [
            _transformers.timeoutTransformer,
            _transformers.credentialsTransformer,
            _transformers.progressTransformer,
            _transformers.responseTypeTransformer,
            _transformers.headerTransformer,
            _transformers.contentTransformer
        ]);
    }
    exports.createHttpRequestMessageProcessor = createHttpRequestMessageProcessor;
});

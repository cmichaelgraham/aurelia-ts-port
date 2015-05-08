System.register(['./headers', './request-message-processor', './transformers'], function(exports_1) {
    var headers_1, request_message_processor_1, transformers_1;
    var HttpRequestMessage;
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
    exports_1("createHttpRequestMessageProcessor", createHttpRequestMessageProcessor);
    return {
        setters:[
            function (_headers_1) {
                headers_1 = _headers_1;
            },
            function (_request_message_processor_1) {
                request_message_processor_1 = _request_message_processor_1;
            },
            function (_transformers_1) {
                transformers_1 = _transformers_1;
            }],
        execute: function() {
            HttpRequestMessage = (function () {
                function HttpRequestMessage(method, uri, content, headers) {
                    this.method = method;
                    this.uri = uri;
                    this.content = content;
                    this.headers = headers || new headers_1.Headers();
                    this.responseType = 'json'; //text, arraybuffer, blob, document
                }
                return HttpRequestMessage;
            })();
            exports_1("HttpRequestMessage", HttpRequestMessage);
        }
    }
});

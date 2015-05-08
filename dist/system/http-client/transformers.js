System.register([], function(exports_1) {
    var ArrayBufferView;
    function timeoutTransformer(client, processor, message, xhr) {
        if (message.timeout !== undefined) {
            xhr.timeout = message.timeout;
        }
    }
    exports_1("timeoutTransformer", timeoutTransformer);
    function callbackParameterNameTransformer(client, processor, message, xhr) {
        if (message.callbackParameterName !== undefined) {
            xhr.callbackParameterName = message.callbackParameterName;
        }
    }
    exports_1("callbackParameterNameTransformer", callbackParameterNameTransformer);
    function credentialsTransformer(client, processor, message, xhr) {
        if (message.withCredentials !== undefined) {
            xhr.withCredentials = message.withCredentials;
        }
    }
    exports_1("credentialsTransformer", credentialsTransformer);
    function progressTransformer(client, processor, message, xhr) {
        if (message.progressCallback) {
            xhr.upload.onprogress = message.progressCallback;
        }
    }
    exports_1("progressTransformer", progressTransformer);
    function responseTypeTransformer(client, processor, message, xhr) {
        var responseType = message.responseType;
        if (responseType === 'json') {
            responseType = 'text'; //IE does not support json
        }
        xhr.responseType = responseType;
    }
    exports_1("responseTypeTransformer", responseTypeTransformer);
    function headerTransformer(client, processor, message, xhr) {
        message.headers.configureXHR(xhr);
    }
    exports_1("headerTransformer", headerTransformer);
    function contentTransformer(client, processor, message, xhr) {
        if (window.FormData && message.content instanceof FormData) {
            return;
        }
        if (window.Blob && message.content instanceof Blob) {
            return;
        }
        if (window.ArrayBufferView && message.content instanceof ArrayBufferView) {
            return;
        }
        if (message.content instanceof Document) {
            return;
        }
        if (typeof message.content === 'string') {
            return;
        }
        if (message.content === null || message.content === undefined) {
            return;
        }
        message.content = JSON.stringify(message.content, message.replacer);
    }
    exports_1("contentTransformer", contentTransformer);
    return {
        setters:[],
        execute: function() {
        }
    }
});

var http_response_message_1 = require('./http-response-message');
var aurelia_path_1 = require('aurelia-path');
function buildFullUri(message) {
    var uri = aurelia_path_1.join(message.baseUri, message.uri), qs;
    if (message.params) {
        qs = aurelia_path_1.buildQueryString(message.params);
        uri = qs ? uri + "?" + qs : uri;
    }
    message.fullUri = uri;
}
var RequestMessageProcessor = (function () {
    function RequestMessageProcessor(xhrType, transformers) {
        this.XHRType = xhrType;
        this.transformers = transformers;
    }
    RequestMessageProcessor.prototype.abort = function () {
        //The logic here is if the xhr object is not set then there is nothing to abort so the intent was carried out
        if (this.xhr) {
            this.xhr.abort();
        }
    };
    RequestMessageProcessor.prototype.process = function (client, message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = _this.xhr = new _this.XHRType(), transformers = _this.transformers, i, ii;
            buildFullUri(message);
            xhr.open(message.method, message.fullUri, true);
            for (i = 0, ii = transformers.length; i < ii; ++i) {
                transformers[i](client, _this, message, xhr);
            }
            xhr.onload = function (e) {
                var response = new http_response_message_1.HttpResponseMessage(message, xhr, message.responseType, message.reviver);
                if (response.isSuccess) {
                    resolve(response);
                }
                else {
                    reject(response);
                }
            };
            xhr.ontimeout = function (e) {
                reject(new http_response_message_1.HttpResponseMessage(message, {
                    response: e,
                    status: xhr.status,
                    statusText: xhr.statusText
                }, 'timeout'));
            };
            xhr.onerror = function (e) {
                reject(new http_response_message_1.HttpResponseMessage(message, {
                    response: e,
                    status: xhr.status,
                    statusText: xhr.statusText
                }, 'error'));
            };
            xhr.onabort = function (e) {
                reject(new http_response_message_1.HttpResponseMessage(message, {
                    response: e,
                    status: xhr.status,
                    statusText: xhr.statusText
                }, 'abort'));
            };
            xhr.send(message.content);
        });
    };
    return RequestMessageProcessor;
})();
exports.RequestMessageProcessor = RequestMessageProcessor;

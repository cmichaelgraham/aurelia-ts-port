define(["require", "exports", './headers', './request-message-processor', './transformers'], function (require, exports, _headers, _request_message_processor, _transformers) {
    var JSONPRequestMessage = (function () {
        function JSONPRequestMessage(uri, callbackParameterName) {
            this.method = 'JSONP';
            this.uri = uri;
            this.content = undefined;
            this.headers = new _headers.Headers();
            this.responseType = 'jsonp';
            this.callbackParameterName = callbackParameterName;
        }
        return JSONPRequestMessage;
    })();
    exports.JSONPRequestMessage = JSONPRequestMessage;
    var JSONPXHR = (function () {
        function JSONPXHR() {
        }
        JSONPXHR.prototype.open = function (method, uri) {
            this.method = method;
            this.uri = uri;
            this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        };
        JSONPXHR.prototype.send = function () {
            var _this = this;
            var uri = this.uri + (this.uri.indexOf('?') >= 0 ? '&' : '?') + this.callbackParameterName + '=' + this.callbackName;
            window[this.callbackName] = function (data) {
                delete window[_this.callbackName];
                document.body.removeChild(script);
                if (_this.status === undefined) {
                    _this.status = 200;
                    _this.statusText = 'OK';
                    _this.response = data;
                    _this.onload(_this);
                }
            };
            var script = document.createElement('script');
            script.src = uri;
            document.body.appendChild(script);
            if (this.timeout !== undefined) {
                setTimeout(function () {
                    if (_this.status === undefined) {
                        _this.status = 0;
                        _this.ontimeout(new Error('timeout'));
                    }
                }, this.timeout);
            }
        };
        JSONPXHR.prototype.abort = function () {
            if (this.status === undefined) {
                this.status = 0;
                this.onabort(new Error('abort'));
            }
        };
        JSONPXHR.prototype.setRequestHeader = function () {
        };
        return JSONPXHR;
    })();
    function createJSONPRequestMessageProcessor() {
        return new _request_message_processor.RequestMessageProcessor(JSONPXHR, [
            _transformers.timeoutTransformer,
            _transformers.callbackParameterNameTransformer
        ]);
    }
    exports.createJSONPRequestMessageProcessor = createJSONPRequestMessageProcessor;
});

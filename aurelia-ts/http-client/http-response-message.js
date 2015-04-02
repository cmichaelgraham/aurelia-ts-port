define(["require", "exports", './headers'], function (require, exports, _headers) {
    var HttpResponseMessage = (function () {
        function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
            this.requestMessage = requestMessage;
            this.statusCode = xhr.status;
            this.response = xhr.response;
            this.isSuccess = xhr.status >= 200 && xhr.status < 400;
            this.statusText = xhr.statusText;
            this.responseType = responseType;
            this.reviver = reviver;
            if (xhr.getAllResponseHeaders) {
                this.headers = _headers.Headers.parse(xhr.getAllResponseHeaders());
            }
            else {
                this.headers = new _headers.Headers();
            }
        }
        Object.defineProperty(HttpResponseMessage.prototype, "content", {
            get: function () {
                try {
                    if (this._content !== undefined) {
                        return this._content;
                    }
                    if (this.response === undefined || this.response === null) {
                        return this._content = this.response;
                    }
                    if (this.responseType === 'json') {
                        return this._content = JSON.parse(this.response, this.reviver);
                    }
                    if (this.reviver) {
                        return this._content = this.reviver(this.response);
                    }
                    return this._content = this.response;
                }
                catch (e) {
                    if (this.isSuccess) {
                        throw e;
                    }
                    return this._content = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        return HttpResponseMessage;
    })();
    exports.HttpResponseMessage = HttpResponseMessage;
});

define(["require", "exports", './headers'], function (require, exports, headers_1) {
    var HttpResponseMessage = (function () {
        function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
            this.requestMessage = requestMessage;
            this.statusCode = xhr.status;
            this.response = xhr.response || xhr.responseText;
            this.isSuccess = xhr.status >= 200 && xhr.status < 400;
            this.statusText = xhr.statusText;
            this.reviver = reviver;
            this.mimeType = null;
            if (xhr.getAllResponseHeaders) {
                try {
                    this.headers = headers_1.Headers.parse(xhr.getAllResponseHeaders());
                }
                catch (err) {
                    //if this fails it means the xhr was a mock object so the `requestHeaders` property should be used
                    if (xhr.requestHeaders)
                        this.headers = { headers: xhr.requestHeaders };
                }
            }
            else {
                this.headers = new headers_1.Headers();
            }
            var contentType;
            if (this.headers && this.headers.headers)
                contentType = this.headers.headers["Content-Type"];
            if (contentType) {
                this.mimeType = responseType = contentType.split(";")[0].trim();
                if (exports.mimeTypes.hasOwnProperty(this.mimeType))
                    responseType = exports.mimeTypes[this.mimeType];
            }
            this.responseType = responseType;
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
    /**
     * MimeTypes mapped to responseTypes
     *
     * @type {Object}
     */
    exports.mimeTypes = {
        "text/html": "html",
        "text/javascript": "js",
        "application/javascript": "js",
        "text/json": "json",
        "application/json": "json",
        "application/rss+xml": "rss",
        "application/atom+xml": "atom",
        "application/xhtml+xml": "xhtml",
        "text/markdown": "md",
        "text/xml": "xml",
        "text/mathml": "mml",
        "application/xml": "xml",
        "text/yml": "yml",
        "text/csv": "csv",
        "text/css": "css",
        "text/less": "less",
        "text/stylus": "styl",
        "text/scss": "scss",
        "text/sass": "sass",
        "text/plain": "txt"
    };
});

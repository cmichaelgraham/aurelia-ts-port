var Headers = (function () {
    function Headers(headers) {
        if (headers === void 0) { headers = {}; }
        this.headers = headers;
    }
    Headers.prototype.add = function (key, value) {
        this.headers[key] = value;
    };
    Headers.prototype.get = function (key) {
        return this.headers[key];
    };
    Headers.prototype.clear = function () {
        this.headers = {};
    };
    Headers.prototype.configureXHR = function (xhr) {
        var headers = this.headers, key;
        for (key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    };
    /**
     * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
     * headers according to the format described here:
     * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
     * This method parses that string into a user-friendly key/value pair object.
     */
    Headers.parse = function (headerStr) {
        var headers = new Headers();
        if (!headerStr) {
            return headers;
        }
        var headerPairs = headerStr.split('\u000d\u000a');
        for (var i = 0; i < headerPairs.length; i++) {
            var headerPair = headerPairs[i];
            // Can't use split() here because it does the wrong thing
            // if the header value has the string ": " in it.
            var index = headerPair.indexOf('\u003a\u0020');
            if (index > 0) {
                var key = headerPair.substring(0, index);
                var val = headerPair.substring(index + 2);
                headers.add(key, val);
            }
        }
        return headers;
    };
    return Headers;
})();
exports.Headers = Headers;

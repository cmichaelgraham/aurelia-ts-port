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
define(["require", "exports", '../framework/index', '../http-client/index'], function (require, exports, index_1, index_2) {
    var Flickr = (function () {
        function Flickr(http) {
            this.heading = 'Flickr';
            this.images = [];
            this.http = http;
        }
        Flickr.inject = function () { return [index_2.HttpClient]; };
        Flickr.prototype.activate = function () {
            var _this = this;
            return this.http.jsonp(this.url).then(function (response) {
                _this.images = response.content.items;
            });
        };
        Flickr.prototype.canDeactivate = function () {
            return confirm('Are you sure you want to leave?');
        };
        Flickr = __decorate([index_1.inject(index_2.HttpClient)], Flickr);
        return Flickr;
    })();
    exports.Flickr = Flickr;
});

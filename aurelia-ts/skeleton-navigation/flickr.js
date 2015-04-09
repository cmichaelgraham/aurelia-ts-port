var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
        Flickr = __decorate([
            index_1.inject(index_2.HttpClient)
        ], Flickr);
        return Flickr;
    })();
    exports.Flickr = Flickr;
});

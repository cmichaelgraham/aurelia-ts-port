var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", '../framework/index', '../router/index'], function (require, exports, index_1, index_2) {
    var App = (function () {
        function App(router) {
            this.router = router;
            this.router.configure(function (config) {
                config.title = 'Aurelia';
                config.map([
                    { route: ['', 'welcome'], moduleId: './welcome', nav: true, title: 'Welcome' },
                    { route: 'flickr', moduleId: './flickr', nav: true },
                    { route: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
                ]);
            });
        }
        App.inject = function () { return [index_2.Router]; };
        App = __decorate([
            index_1.inject(index_2.Router)
        ], App);
        return App;
    })();
    exports.App = App;
});

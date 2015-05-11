System.register(['bootstrap', 'bootstrap/css/bootstrap.css!'], function(exports_1) {
    var App;
    return {
        setters:[
            function (_) {},
            function (_) {}],
        execute: function() {
            App = (function () {
                function App() {
                }
                App.prototype.configureRouter = function (config, router) {
                    this.router = router;
                    config.title = 'Aurelia';
                    config.map([
                        { route: ['', 'welcome'], moduleId: './welcome', nav: true, title: 'Welcome' },
                        { route: 'flickr', moduleId: './flickr', nav: true, title: 'Flickr' },
                        { route: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
                    ]);
                };
                return App;
            })();
            exports_1("App", App);
        }
    }
});

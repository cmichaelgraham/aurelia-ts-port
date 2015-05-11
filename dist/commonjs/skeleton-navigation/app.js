require('bootstrap');
require('bootstrap/css/bootstrap.css!');
var App = (function () {
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
exports.App = App;

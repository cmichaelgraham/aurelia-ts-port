var web_api_1 = require('./web-api');
var App = (function () {
    function App(api) {
        this.api = api;
    }
    App.prototype.configureRouter = function (config, router) {
        config.title = 'Contacts';
        config.map([
            { route: '', moduleId: 'no-selection', title: 'Select' },
            { route: 'contacts/:id', moduleId: 'contact-detail' }
        ]);
        this.router = router;
    };
    App.inject = [web_api_1.WebAPI];
    return App;
})();
exports.App = App;

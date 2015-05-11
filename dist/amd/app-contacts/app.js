define(["require", "exports", './web-api'], function (require, exports, web_api_1) {
    var App = (function () {
        function App(api) {
            this.api = api;
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Contacts';
            config.map([
                { route: '', moduleId: 'no-selection', title: 'Select' },
                { route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts' }
            ]);
            this.router = router;
        };
        App.inject = [web_api_1.WebAPI];
        return App;
    })();
    exports.App = App;
});

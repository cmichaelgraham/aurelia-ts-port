define(["require", "exports", 'aurelia-router', './web-api'], function (require, exports, aurelia_router_1, web_api_1) {
    var App = (function () {
        function App(router, api) {
            this.router = router;
            this.api = api;
            this.router.configure(function (config) {
                config.title = 'Contacts';
                config.map([
                    { route: '', moduleId: 'no-selection', title: 'Select' },
                    { route: 'contacts/:id', moduleId: 'contact-detail' }
                ]);
            });
        }
        App.inject = [aurelia_router_1.Router, web_api_1.WebAPI];
        return App;
    })();
    exports.App = App;
});

System.register(['./web-api'], function(exports_1) {
    var web_api_1;
    var App;
    return {
        setters:[
            function (_web_api_1) {
                web_api_1 = _web_api_1;
            }],
        execute: function() {
            App = (function () {
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
            exports_1("App", App);
        }
    }
});

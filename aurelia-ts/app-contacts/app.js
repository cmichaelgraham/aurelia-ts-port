define(["require", "exports", '../router/index', './web-api'], function (require, exports, _index, _web_api) {
    var App = (function () {
        function App(router, api) {
            this.router = router;
            this.api = api;
            this.router.configure(function (config) {
                config.title = 'Contacts';
                config.map([
                    {
                        route: '',
                        moduleId: 'no-selection',
                        title: 'Select'
                    },
                    {
                        route: 'contacts/:id',
                        moduleId: 'contact-detail'
                    }
                ]);
            });
        }
        App.inject = function () {
            return [
                _index.Router,
                _web_api.WebAPI
            ];
        };
        return App;
    })();
    exports.App = App;
});

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
define(["require", "exports", '../framework/index', '../router/index', './web-api'], function (require, exports, index_1, index_2, web_api_1) {
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
        App = __decorate([index_1.inject(index_2.Router, web_api_1.WebAPI)], App);
        return App;
    })();
    exports.App = App;
});

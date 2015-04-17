var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'aurelia-framework', 'aurelia-router', './web-api'], function (require, exports, aurelia_framework_1, aurelia_router_1, web_api_1) {
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
        App = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router, web_api_1.WebAPI)
        ], App);
        return App;
    })();
    exports.App = App;
});

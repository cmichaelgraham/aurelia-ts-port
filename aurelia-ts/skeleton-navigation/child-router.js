var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'aurelia-framework', 'aurelia-router'], function (require, exports, aurelia_framework_1, aurelia_router_1) {
    var ChildRouter = (function () {
        function ChildRouter(router) {
            this.heading = 'Child Router';
            this.router = router;
            router.configure(function (config) {
                config.map([
                    { route: ['', 'welcome'], moduleId: './welcome', nav: true, title: 'Welcome' },
                    { route: 'flickr', moduleId: './flickr', nav: true },
                    { route: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
                ]);
            });
        }
        ChildRouter = __decorate([
            aurelia_framework_1.inject(aurelia_router_1.Router)
        ], ChildRouter);
        return ChildRouter;
    })();
    exports.ChildRouter = ChildRouter;
});

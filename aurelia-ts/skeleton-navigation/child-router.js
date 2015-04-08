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
define(["require", "exports", '../framework/index', '../router/index'], function (require, exports, index_1, index_2) {
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
        ChildRouter.inject = function () { return [index_2.Router]; };
        ChildRouter = __decorate([index_1.inject(index_2.Router)], ChildRouter);
        return ChildRouter;
    })();
    exports.ChildRouter = ChildRouter;
});

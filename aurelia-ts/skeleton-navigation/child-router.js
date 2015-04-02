define(["require", "exports", '../router/index'], function (require, exports, _index) {
    var ChildRouter = (function () {
        function ChildRouter(router) {
            this.heading = 'Child Router';
            this.router = router;
            router.configure(function (config) {
                config.map([
                    {
                        route: [
                            '',
                            'welcome'
                        ],
                        moduleId: './welcome',
                        nav: true,
                        title: 'Welcome'
                    },
                    {
                        route: 'flickr',
                        moduleId: './flickr',
                        nav: true
                    },
                    {
                        route: 'child-router',
                        moduleId: './child-router',
                        nav: true,
                        title: 'Child Router'
                    }
                ]);
            });
        }
        ChildRouter.inject = function () {
            return [
                _index.Router
            ];
        };
        return ChildRouter;
    })();
    exports.ChildRouter = ChildRouter;
});

define(["require", "exports"], function (require, exports) {
    /**
     * Determines if the provided object is a navigation command.
     * A navigation command is anything with a navigate method.
     * @param {object} obj The item to check.
     * @return {boolean}
     */
    function isNavigationCommand(obj) {
        return obj && typeof obj.navigate === 'function';
    }
    exports.isNavigationCommand = isNavigationCommand;
    /**
    * Used during the activation lifecycle to cause a redirect.
    *
    * @class Redirect
    * @constructor
    * @param {String} url The url to redirect to.
    */
    var Redirect = (function () {
        function Redirect(url, options) {
            this.url = url;
            this.options = Object.assign({ trigger: true, replace: true }, options || {});
            this.shouldContinueProcessing = false;
        }
        /**
        * Called by the activation system to set the child router.
        *
        * @method setRouter
        * @param {Router} router
        */
        Redirect.prototype.setRouter = function (router) {
            this.router = router;
        };
        /**
        * Called by the navigation pipeline to navigate.
        *
        * @method navigate
        * @param {Router} appRouter - a router which should redirect
        */
        Redirect.prototype.navigate = function (appRouter) {
            var navigatingRouter = this.options.useAppRouter ? appRouter : (this.router || appRouter);
            navigatingRouter.navigate(this.url, this.options);
        };
        return Redirect;
    })();
    exports.Redirect = Redirect;
});

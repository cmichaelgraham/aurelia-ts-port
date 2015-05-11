/**
 * Class for storing and interacting with a route's navigation settings
 *
 * @class NavModel
 * @constructor
 */
var NavModel = (function () {
    function NavModel(router, relativeHref) {
        this.router = router;
        this.relativeHref = relativeHref;
        /**
         * True if this nav item is currently active.
         *
         * @property {Boolean} isActive
         */
        this.isActive = false;
        /**
         * The title.
         *
         * @property {String} title
         */
        this.title = null;
        /**
         * This nav item's absolute href.
         *
         * @property {String} href
         */
        this.href = null;
        /**
         * Data attached to the route at configuration time.
         *
         * @property {any} settings
         */
        this.settings = {};
        /**
         * The route config.
         *
         * @property {Object} config
         */
        this.config = null;
    }
    /**
     * Sets the route's title and updates document.title.
     *  If the a navigation is in progress, the change will be applied
     *  to document.title when the navigation completes.
     *
     * @method setTitle
     * @param {String} title The new title.
     */
    NavModel.prototype.setTitle = function (title) {
        this.title = title;
        if (this.isActive) {
            this.router.updateTitle();
        }
    };
    return NavModel;
})();
exports.NavModel = NavModel;

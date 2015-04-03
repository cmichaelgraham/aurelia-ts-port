var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../templating/index', '../router/index', '../path/index', '../metadata/index'], function (require, exports, _index, _index_1, _index_2, _index_3) {
    var TemplatingRouteLoader = (function (_super) {
        __extends(TemplatingRouteLoader, _super);
        function TemplatingRouteLoader(compositionEngine) {
            this.compositionEngine = compositionEngine;
        }
        TemplatingRouteLoader.inject = function () {
            return [
                _index.CompositionEngine
            ];
        };
        TemplatingRouteLoader.prototype.loadRoute = function (router, config) {
            var childContainer = router.container.createChild(), instruction = {
                viewModel: _index_2.relativeToFile(config.moduleId, _index_3.Origin.get(router.container.viewModel.constructor).moduleId),
                childContainer: childContainer,
                view: config.view || config.viewStrategy
            }, childRouter;
            childContainer.registerHandler(_index_1.Router, function (c) {
                return childRouter || (childRouter = router.createChild(childContainer));
            });
            return this.compositionEngine.createViewModel(instruction).then(function (instruction) {
                instruction.executionContext = instruction.viewModel;
                instruction.router = router;
                return instruction;
            });
        };
        return TemplatingRouteLoader;
    })(_index_1.RouteLoader);
    exports.TemplatingRouteLoader = TemplatingRouteLoader;
});

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", '../dependency-injection/index', '../templating/index', '../router/index', '../path/index', '../metadata/index'], function (require, exports, index_1, index_2, index_3, index_4, index_5) {
    var TemplatingRouteLoader = (function (_super) {
        __extends(TemplatingRouteLoader, _super);
        function TemplatingRouteLoader(compositionEngine) {
            _super.call(this);
            this.compositionEngine = compositionEngine;
        }
        TemplatingRouteLoader.prototype.loadRoute = function (router, config) {
            var childContainer = router.container.createChild(), instruction = {
                viewModel: index_4.relativeToFile(config.moduleId, (index_5.Origin.get(router.container.viewModel.constructor)).moduleId),
                childContainer: childContainer,
                view: config.view || config.viewStrategy
            }, childRouter;
            childContainer.registerHandler(index_3.Router, function (c) {
                return childRouter || (childRouter = router.createChild(childContainer));
            });
            return this.compositionEngine.createViewModel(instruction).then(function (instruction) {
                instruction.executionContext = instruction.viewModel;
                instruction.router = router;
                return instruction;
            });
        };
        TemplatingRouteLoader = __decorate([
            index_1.inject(index_2.CompositionEngine)
        ], TemplatingRouteLoader);
        return TemplatingRouteLoader;
    })(index_3.RouteLoader);
    exports.TemplatingRouteLoader = TemplatingRouteLoader;
});

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
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-router', 'aurelia-path', 'aurelia-metadata'], function (require, exports, aurelia_dependency_injection_1, aurelia_templating_1, aurelia_router_1, aurelia_path_1, aurelia_metadata_1) {
    var TemplatingRouteLoader = (function (_super) {
        __extends(TemplatingRouteLoader, _super);
        function TemplatingRouteLoader(compositionEngine) {
            _super.call(this);
            this.compositionEngine = compositionEngine;
        }
        TemplatingRouteLoader.prototype.loadRoute = function (router, config) {
            var childContainer = router.container.createChild(), instruction = {
                viewModel: aurelia_path_1.relativeToFile(config.moduleId, (aurelia_metadata_1.Origin.get(router.container.viewModel.constructor)).moduleId),
                childContainer: childContainer,
                view: config.view || config.viewStrategy
            }, childRouter;
            childContainer.registerHandler(aurelia_router_1.Router, function (c) {
                return childRouter || (childRouter = router.createChild(childContainer));
            });
            return this.compositionEngine.createViewModel(instruction).then(function (instruction) {
                instruction.executionContext = instruction.viewModel;
                instruction.router = router;
                return instruction;
            });
        };
        TemplatingRouteLoader = __decorate([
            aurelia_dependency_injection_1.inject(aurelia_templating_1.CompositionEngine)
        ], TemplatingRouteLoader);
        return TemplatingRouteLoader;
    })(RouteLoader);
    exports.TemplatingRouteLoader = TemplatingRouteLoader;
});

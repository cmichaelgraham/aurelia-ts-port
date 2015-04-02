var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../metadata/index', '../path/index'], function (require, exports, _index, _index_1) {
    var ViewStrategy = (function () {
        function ViewStrategy() {
        }
        ViewStrategy.prototype.makeRelativeTo = function (baseUrl) {
        };
        ViewStrategy.prototype.loadViewFactory = function (viewEngine, options) {
            throw new Error('A ViewStrategy must implement loadViewFactory(viewEngine, options).');
        };
        ViewStrategy.normalize = function (value) {
            if (typeof value === 'string') {
                value = new UseView(value);
            }
            if (value && !(value instanceof ViewStrategy)) {
                throw new Error('The view must be a string or an instance of ViewStrategy.');
            }
            return value;
        };
        ViewStrategy.getDefault = function (target) {
            var strategy, annotation;
            if (typeof target !== 'function') {
                target = target.constructor;
            }
            annotation = _index.Origin.get(target);
            strategy = _index.Metadata.on(target).first(ViewStrategy);
            if (!strategy) {
                if (!annotation) {
                    throw new Error('Cannot determinte default view strategy for object.', target);
                }
                strategy = new ConventionalView(annotation.moduleId);
            }
            else if (annotation) {
                strategy.moduleId = annotation.moduleId;
            }
            return strategy;
        };
        return ViewStrategy;
    })();
    exports.ViewStrategy = ViewStrategy;
    var UseView = (function (_super) {
        __extends(UseView, _super);
        function UseView(path) {
            this.path = path;
        }
        UseView.prototype.loadViewFactory = function (viewEngine, options) {
            if (!this.absolutePath && this.moduleId) {
                this.absolutePath = _index_1.relativeToFile(this.path, this.moduleId);
            }
            return viewEngine.loadViewFactory(this.absolutePath || this.path, options, this.moduleId);
        };
        UseView.prototype.makeRelativeTo = function (file) {
            this.absolutePath = _index_1.relativeToFile(this.path, file);
        };
        return UseView;
    })(ViewStrategy);
    exports.UseView = UseView;
    var ConventionalView = (function (_super) {
        __extends(ConventionalView, _super);
        function ConventionalView(moduleId) {
            this.moduleId = moduleId;
            this.viewUrl = ConventionalView.convertModuleIdToViewUrl(moduleId);
        }
        ConventionalView.prototype.loadViewFactory = function (viewEngine, options) {
            return viewEngine.loadViewFactory(this.viewUrl, options, this.moduleId);
        };
        ConventionalView.convertModuleIdToViewUrl = function (moduleId) {
            return moduleId + '.html';
        };
        return ConventionalView;
    })(ViewStrategy);
    exports.ConventionalView = ConventionalView;
    var NoView = (function (_super) {
        __extends(NoView, _super);
        function NoView() {
            _super.apply(this, arguments);
        }
        NoView.prototype.loadViewFactory = function () {
            return Promise.resolve(null);
        };
        return NoView;
    })(ViewStrategy);
    exports.NoView = NoView;
    var TemplateRegistryViewStrategy = (function (_super) {
        __extends(TemplateRegistryViewStrategy, _super);
        function TemplateRegistryViewStrategy(moduleId, registryEntry) {
            this.moduleId = moduleId;
            this.registryEntry = registryEntry;
        }
        TemplateRegistryViewStrategy.prototype.loadViewFactory = function (viewEngine, options) {
            if (this.registryEntry.isReady) {
                return Promise.resolve(this.registryEntry.factory);
            }
            return viewEngine.loadViewFactory(this.registryEntry, options, this.moduleId);
        };
        return TemplateRegistryViewStrategy;
    })(ViewStrategy);
    exports.TemplateRegistryViewStrategy = TemplateRegistryViewStrategy;
});

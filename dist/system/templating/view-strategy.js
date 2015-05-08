var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};System.register(['aurelia-metadata', 'aurelia-path', 'aurelia-logging'], function(exports_1) {
    var aurelia_metadata_1, aurelia_path_1, aurelia_logging_1;
    var ViewStrategy, UseViewStrategy, ConventionalViewStrategy, NoViewStrategy, TemplateRegistryViewStrategy;
    return {
        setters:[
            function (_aurelia_metadata_1) {
                aurelia_metadata_1 = _aurelia_metadata_1;
            },
            function (_aurelia_path_1) {
                aurelia_path_1 = _aurelia_path_1;
            },
            function (_aurelia_logging_1) {
                aurelia_logging_1 = _aurelia_logging_1;
            }],
        execute: function() {
            ViewStrategy = (function () {
                function ViewStrategy() {
                }
                ViewStrategy.prototype.makeRelativeTo = function (baseUrl) { };
                ViewStrategy.normalize = function (value) {
                    if (typeof value === 'string') {
                        value = new UseViewStrategy(value);
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
                    annotation = aurelia_metadata_1.Origin.get(target);
                    strategy = aurelia_metadata_1.Metadata.get(ViewStrategy.metadataKey, target);
                    if (!strategy) {
                        if (!annotation) {
                            throw aurelia_logging_1.AggregateError('Cannot determinte default view strategy for object.', target);
                        }
                        strategy = new ConventionalViewStrategy(annotation.moduleId);
                    }
                    else if (annotation) {
                        strategy.moduleId = annotation.moduleId;
                    }
                    return strategy;
                };
                ViewStrategy.metadataKey = 'aurelia:view-strategy';
                return ViewStrategy;
            })();
            exports_1("ViewStrategy", ViewStrategy);
            UseViewStrategy = (function (_super) {
                __extends(UseViewStrategy, _super);
                function UseViewStrategy(path) {
                    _super.call(this);
                    this.path = path;
                }
                UseViewStrategy.prototype.loadViewFactory = function (viewEngine, options) {
                    if (!this.absolutePath && this.moduleId) {
                        this.absolutePath = aurelia_path_1.relativeToFile(this.path, this.moduleId);
                    }
                    return viewEngine.loadViewFactory(this.absolutePath || this.path, options, this.moduleId);
                };
                UseViewStrategy.prototype.makeRelativeTo = function (file) {
                    this.absolutePath = aurelia_path_1.relativeToFile(this.path, file);
                };
                return UseViewStrategy;
            })(ViewStrategy);
            exports_1("UseViewStrategy", UseViewStrategy);
            ConventionalViewStrategy = (function (_super) {
                __extends(ConventionalViewStrategy, _super);
                function ConventionalViewStrategy(moduleId) {
                    _super.call(this);
                    this.moduleId = moduleId;
                    this.viewUrl = ConventionalViewStrategy.convertModuleIdToViewUrl(moduleId);
                }
                ConventionalViewStrategy.prototype.loadViewFactory = function (viewEngine, options) {
                    return viewEngine.loadViewFactory(this.viewUrl, options, this.moduleId);
                };
                ConventionalViewStrategy.convertModuleIdToViewUrl = function (moduleId) {
                    return moduleId + '.html';
                };
                return ConventionalViewStrategy;
            })(ViewStrategy);
            exports_1("ConventionalViewStrategy", ConventionalViewStrategy);
            NoViewStrategy = (function (_super) {
                __extends(NoViewStrategy, _super);
                function NoViewStrategy() {
                    _super.apply(this, arguments);
                }
                NoViewStrategy.prototype.loadViewFactory = function () {
                    return Promise.resolve(null);
                };
                return NoViewStrategy;
            })(ViewStrategy);
            exports_1("NoViewStrategy", NoViewStrategy);
            TemplateRegistryViewStrategy = (function (_super) {
                __extends(TemplateRegistryViewStrategy, _super);
                function TemplateRegistryViewStrategy(moduleId, registryEntry) {
                    _super.call(this);
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
            exports_1("TemplateRegistryViewStrategy", TemplateRegistryViewStrategy);
        }
    }
});

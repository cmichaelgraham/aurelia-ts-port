define(["require", "exports", '../logging/index', '../metadata/index', '../loader/index', '../dependency-injection/index', './view-compiler', './resource-registry', './module-analyzer'], function (require, exports, LogManager, _index, _index_1, _index_2, _view_compiler, _resource_registry, _module_analyzer) {
    var logger = LogManager.getLogger('templating');
    function ensureRegistryEntry(loader, urlOrRegistryEntry) {
        if (urlOrRegistryEntry instanceof _index_1.TemplateRegistryEntry) {
            return Promise.resolve(urlOrRegistryEntry);
        }
        return loader.loadTemplate(urlOrRegistryEntry);
    }
    var ViewEngine = (function () {
        function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
            this.loader = loader;
            this.container = container;
            this.viewCompiler = viewCompiler;
            this.moduleAnalyzer = moduleAnalyzer;
            this.appResources = appResources;
        }
        ViewEngine.inject = function () {
            return [
                _index_1.Loader,
                _index_2.Container,
                _view_compiler.ViewCompiler,
                _module_analyzer.ModuleAnalyzer,
                _resource_registry.ResourceRegistry
            ];
        };
        ViewEngine.prototype.loadViewFactory = function (urlOrRegistryEntry, compileOptions, associatedModuleId) {
            var _this = this;
            return ensureRegistryEntry(this.loader, urlOrRegistryEntry).then(function (viewRegistryEntry) {
                if (viewRegistryEntry.isReady) {
                    return viewRegistryEntry.factory;
                }
                return _this.loadTemplateResources(viewRegistryEntry, associatedModuleId).then(function (resources) {
                    if (viewRegistryEntry.isReady) {
                        return viewRegistryEntry.factory;
                    }
                    viewRegistryEntry.setResources(resources);
                    var viewFactory = _this.viewCompiler.compile(viewRegistryEntry.template, resources, compileOptions);
                    viewRegistryEntry.setFactory(viewFactory);
                    return viewFactory;
                });
            });
        };
        ViewEngine.prototype.loadTemplateResources = function (viewRegistryEntry, associatedModuleId) {
            var resources = new _resource_registry.ViewResources(this.appResources, viewRegistryEntry.id), dependencies = viewRegistryEntry.dependencies, importIds, names;
            if (dependencies.length === 0 && !associatedModuleId) {
                return Promise.resolve(resources);
            }
            importIds = dependencies.map(function (x) {
                return x.src;
            });
            names = dependencies.map(function (x) {
                return x.name;
            });
            logger.debug("importing resources for " + viewRegistryEntry.id, importIds);
            return this.importViewResources(importIds, names, resources, associatedModuleId);
        };
        ViewEngine.prototype.importViewModelResource = function (moduleImport, moduleMember) {
            var _this = this;
            return this.loader.loadModule(moduleImport).then(function (viewModelModule) {
                var normalizedId = _index.Origin.get(viewModelModule).moduleId, resourceModule = _this.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);
                if (!resourceModule.mainResource) {
                    throw new Error("No view model found in module \"" + moduleImport + "\".");
                }
                resourceModule.analyze(_this.container);
                return resourceModule.mainResource;
            });
        };
        ViewEngine.prototype.importViewResources = function (moduleIds, names, resources, associatedModuleId) {
            var _this = this;
            return this.loader.loadAllModules(moduleIds).then(function (imports) {
                var i, ii, analysis, normalizedId, current, associatedModule, container = _this.container, moduleAnalyzer = _this.moduleAnalyzer, allAnalysis = new Array(imports.length);
                //analyze and register all resources first
                //this enables circular references for global refs
                //and enables order independence
                for (i = 0, ii = imports.length; i < ii; ++i) {
                    current = imports[i];
                    normalizedId = _index.Origin.get(current).moduleId;
                    analysis = moduleAnalyzer.analyze(normalizedId, current);
                    analysis.analyze(container);
                    analysis.register(resources, names[i]);
                    allAnalysis[i] = analysis;
                }
                if (associatedModuleId) {
                    associatedModule = moduleAnalyzer.getAnalysis(associatedModuleId);
                    if (associatedModule) {
                        associatedModule.register(resources);
                    }
                }
                //cause compile/load of any associated views second
                //as a result all globals have access to all other globals during compilation
                for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
                    allAnalysis[i] = allAnalysis[i].load(container);
                }
                return Promise.all(allAnalysis).then(function () {
                    return resources;
                });
            });
        };
        return ViewEngine;
    })();
    exports.ViewEngine = ViewEngine;
});

var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", '../metadata/index', '../loader/index', '../binding/index', './custom-element', './attached-behavior', './template-controller', './view-strategy', './util'], function (require, exports, index_1, index_2, index_3, custom_element_1, attached_behavior_1, template_controller_1, view_strategy_1, util_1) {
    var ResourceModule = (function () {
        function ResourceModule(moduleId) {
            this.id = moduleId;
            this.moduleInstance = null;
            this.mainResource = null;
            this.resources = null;
            this.viewStrategy = null;
            this.isAnalyzed = false;
        }
        ResourceModule.prototype.analyze = function (container) {
            var current = this.mainResource, resources = this.resources, viewStrategy = this.viewStrategy, i, ii, metadata;
            if (this.isAnalyzed) {
                return;
            }
            this.isAnalyzed = true;
            if (current) {
                metadata = current.metadata;
                metadata.viewStrategy = viewStrategy;
                if ('analyze' in metadata && !metadata.isAnalyzed) {
                    metadata.isAnalyzed = true;
                    metadata.analyze(container, current.value);
                }
            }
            for (i = 0, ii = resources.length; i < ii; ++i) {
                current = resources[i];
                metadata = current.metadata;
                metadata.viewStrategy = viewStrategy;
                if ('analyze' in metadata && !metadata.isAnalyzed) {
                    metadata.isAnalyzed = true;
                    metadata.analyze(container, current.value);
                }
            }
        };
        ResourceModule.prototype.register = function (registry, name) {
            var i, ii, resources = this.resources;
            if (this.mainResource) {
                this.mainResource.metadata.register(registry, name);
                name = null;
            }
            for (i = 0, ii = resources.length; i < ii; ++i) {
                resources[i].metadata.register(registry, name);
                name = null;
            }
        };
        ResourceModule.prototype.load = function (container) {
            var current = this.mainResource, resources = this.resources, i, ii, metadata, loads;
            if (this.isLoaded) {
                return Promise.resolve();
            }
            this.isLoaded = true;
            loads = [];
            if (current) {
                metadata = current.metadata;
                if ('load' in metadata && !metadata.isLoaded) {
                    metadata.isLoaded = true;
                    loads.push(metadata.load(container, current.value));
                }
            }
            for (i = 0, ii = resources.length; i < ii; ++i) {
                current = resources[i];
                metadata = current.metadata;
                if ('load' in metadata && !metadata.isLoaded) {
                    metadata.isLoaded = true;
                    loads.push(metadata.load(container, current.value));
                }
            }
            return Promise.all(loads);
        };
        return ResourceModule;
    })();
    var ResourceDescription = (function () {
        function ResourceDescription(key, exportedValue, allMetadata, resourceTypeMeta) {
            if (!resourceTypeMeta) {
                if (!allMetadata) {
                    allMetadata = index_1.Metadata.on(exportedValue);
                }
                resourceTypeMeta = allMetadata.first(index_1.ResourceType);
                if (!resourceTypeMeta) {
                    resourceTypeMeta = new custom_element_1.CustomElement(util_1.hyphenate(key));
                    allMetadata.add(resourceTypeMeta);
                }
            }
            if (!resourceTypeMeta.name) {
                resourceTypeMeta.name = util_1.hyphenate(key);
            }
            this.metadata = resourceTypeMeta;
            this.value = exportedValue;
        }
        return ResourceDescription;
    })();
    var ModuleAnalyzer = (function () {
        function ModuleAnalyzer() {
            this.cache = {};
        }
        ModuleAnalyzer.prototype.getAnalysis = function (moduleId) {
            return this.cache[moduleId];
        };
        ModuleAnalyzer.prototype.analyze = function (moduleId, moduleInstance, viewModelMember) {
            var mainResource, fallbackValue, fallbackKey, fallbackMetadata, resourceTypeMeta, key, allMetadata, exportedValue, resources = [], conventional, viewStrategy, resourceModule;
            resourceModule = this.cache[moduleId];
            if (resourceModule) {
                return resourceModule;
            }
            resourceModule = new ResourceModule(moduleId);
            this.cache[moduleId] = resourceModule;
            if (typeof moduleInstance === 'function') {
                moduleInstance = { 'default': moduleInstance };
            }
            if (viewModelMember) {
                mainResource = new ResourceDescription(viewModelMember, moduleInstance[viewModelMember]);
            }
            for (key in moduleInstance) {
                exportedValue = moduleInstance[key];
                if (key === viewModelMember || typeof exportedValue !== 'function') {
                    continue;
                }
                allMetadata = index_1.Metadata.on(exportedValue);
                resourceTypeMeta = allMetadata.first(index_1.ResourceType);
                if (resourceTypeMeta) {
                    if (!mainResource && resourceTypeMeta instanceof custom_element_1.CustomElement) {
                        mainResource = new ResourceDescription(key, exportedValue, allMetadata, resourceTypeMeta);
                    }
                    else {
                        resources.push(new ResourceDescription(key, exportedValue, allMetadata, resourceTypeMeta));
                    }
                }
                else if (exportedValue instanceof view_strategy_1.ViewStrategy) {
                    viewStrategy = exportedValue;
                }
                else if (exportedValue instanceof index_2.TemplateRegistryEntry) {
                    viewStrategy = new view_strategy_1.TemplateRegistryViewStrategy(moduleId, exportedValue);
                }
                else {
                    if (conventional = custom_element_1.CustomElement.convention(key)) {
                        if (!mainResource) {
                            mainResource = new ResourceDescription(key, exportedValue, allMetadata, conventional);
                        }
                        else {
                            resources.push(new ResourceDescription(key, exportedValue, allMetadata, conventional));
                        }
                        allMetadata.add(conventional);
                    }
                    else if (conventional = attached_behavior_1.AttachedBehavior.convention(key)) {
                        resources.push(new ResourceDescription(key, exportedValue, allMetadata, conventional));
                        allMetadata.add(conventional);
                    }
                    else if (conventional = template_controller_1.TemplateController.convention(key)) {
                        resources.push(new ResourceDescription(key, exportedValue, allMetadata, conventional));
                        allMetadata.add(conventional);
                    }
                    else if (conventional = index_3.ValueConverter.convention(key)) {
                        resources.push(new ResourceDescription(key, exportedValue, allMetadata, conventional));
                        allMetadata.add(conventional);
                    }
                    else if (!fallbackValue) {
                        fallbackValue = exportedValue;
                        fallbackKey = key;
                        fallbackMetadata = allMetadata;
                    }
                }
            }
            if (!mainResource && fallbackValue) {
                mainResource = new ResourceDescription(fallbackKey, fallbackValue, fallbackMetadata);
            }
            resourceModule.moduleInstance = moduleInstance;
            resourceModule.mainResource = mainResource;
            resourceModule.resources = resources;
            resourceModule.viewStrategy = viewStrategy;
            return resourceModule;
        };
        return ModuleAnalyzer;
    })();
    exports.ModuleAnalyzer = ModuleAnalyzer;
});

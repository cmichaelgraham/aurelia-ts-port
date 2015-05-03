define(["require", "exports", 'aurelia-metadata', 'aurelia-loader', 'aurelia-binding', './html-behavior', './view-strategy', './util'], function (require, exports, aurelia_metadata_1, aurelia_loader_1, aurelia_binding_1, html_behavior_1, view_strategy_1, util_1) {
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
        function ResourceDescription(key, exportedValue, resourceTypeMeta) {
            if (!resourceTypeMeta) {
                resourceTypeMeta = aurelia_metadata_1.Metadata.get(aurelia_metadata_1.Metadata.resource, exportedValue);
                if (!resourceTypeMeta) {
                    resourceTypeMeta = new html_behavior_1.HtmlBehaviorResource();
                    resourceTypeMeta.elementName = util_1.hyphenate(key);
                    Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, resourceTypeMeta, exportedValue);
                }
            }
            if (resourceTypeMeta instanceof html_behavior_1.HtmlBehaviorResource) {
                if (resourceTypeMeta.elementName === undefined) {
                    //customeElement()
                    resourceTypeMeta.elementName = util_1.hyphenate(key);
                }
                else if (resourceTypeMeta.attributeName === undefined) {
                    //customAttribute()
                    resourceTypeMeta.attributeName = util_1.hyphenate(key);
                }
                else if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
                    //no customeElement or customAttribute but behavior added by other metadata
                    html_behavior_1.HtmlBehaviorResource.convention(key, resourceTypeMeta);
                }
            }
            else if (!resourceTypeMeta.name) {
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
            var mainResource, fallbackValue, fallbackKey, resourceTypeMeta, key, exportedValue, resources = [], conventional, viewStrategy, resourceModule;
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
                resourceTypeMeta = aurelia_metadata_1.Metadata.get(aurelia_metadata_1.Metadata.resource, exportedValue);
                if (resourceTypeMeta) {
                    if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
                        //no customeElement or customAttribute but behavior added by other metadata
                        html_behavior_1.HtmlBehaviorResource.convention(key, resourceTypeMeta);
                    }
                    if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
                        //no convention and no customeElement or customAttribute but behavior added by other metadata
                        resourceTypeMeta.elementName = util_1.hyphenate(key);
                    }
                    if (!mainResource && resourceTypeMeta instanceof html_behavior_1.HtmlBehaviorResource && resourceTypeMeta.elementName !== null) {
                        mainResource = new ResourceDescription(key, exportedValue, resourceTypeMeta);
                    }
                    else {
                        resources.push(new ResourceDescription(key, exportedValue, resourceTypeMeta));
                    }
                }
                else if (exportedValue instanceof view_strategy_1.ViewStrategy) {
                    viewStrategy = exportedValue;
                }
                else if (exportedValue instanceof aurelia_loader_1.TemplateRegistryEntry) {
                    viewStrategy = new view_strategy_1.TemplateRegistryViewStrategy(moduleId, exportedValue);
                }
                else {
                    if (conventional = html_behavior_1.HtmlBehaviorResource.convention(key)) {
                        if (conventional.elementName !== null && !mainResource) {
                            mainResource = new ResourceDescription(key, exportedValue, conventional);
                        }
                        else {
                            resources.push(new ResourceDescription(key, exportedValue, conventional));
                        }
                        Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, conventional, exportedValue);
                    }
                    else if (conventional = aurelia_binding_1.ValueConverterResource.convention(key)) {
                        resources.push(new ResourceDescription(key, exportedValue, conventional));
                        Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, conventional, exportedValue);
                    }
                    else if (!fallbackValue) {
                        fallbackValue = exportedValue;
                        fallbackKey = key;
                    }
                }
            }
            if (!mainResource && fallbackValue) {
                mainResource = new ResourceDescription(fallbackKey, fallbackValue);
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

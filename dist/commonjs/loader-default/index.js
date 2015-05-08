var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var aurelia_metadata_1 = require('aurelia-metadata');
var aurelia_loader_1 = require('aurelia-loader');
if (!window.System || !window.System.import) {
    var sys = window.System = window.System || {};
    sys.polyfilled = true;
    sys.map = {};
    sys['import'] = function (moduleId) {
        return new Promise(function (resolve, reject) {
            require([moduleId], resolve, reject);
        });
    };
    sys.normalize = function (url) {
        return Promise.resolve(url);
    };
}
function ensureOriginOnExports(executed, name) {
    var target = executed, key, exportedValue;
    if (target.__useDefault) {
        target = target['default'];
    }
    aurelia_metadata_1.Origin.set(target, new aurelia_metadata_1.Origin(name, 'default'));
    for (key in target) {
        exportedValue = target[key];
        if (typeof exportedValue === "function") {
            aurelia_metadata_1.Origin.set(exportedValue, new aurelia_metadata_1.Origin(name, key));
        }
    }
    return executed;
}
var DefaultLoader = (function (_super) {
    __extends(DefaultLoader, _super);
    function DefaultLoader() {
        _super.call(this);
        this.moduleRegistry = {};
        var that = this;
        if (window.System.polyfilled) {
            define('view', [], {
                'load': function (name, req, onload, config) {
                    var entry = that.getOrCreateTemplateRegistryEntry(name), address;
                    if (entry.templateIsLoaded) {
                        onload(entry);
                        return;
                    }
                    address = req.toUrl(name);
                    that.importTemplate(address).then(function (template) {
                        entry.setTemplate(template);
                        onload(entry);
                    });
                }
            });
        }
        else {
            window.System.set('view', window.System.newModule({
                'fetch': function (load, fetch) {
                    var id = load.name.substring(0, load.name.indexOf('!'));
                    var entry = load.metadata.templateRegistryEntry = that.getOrCreateTemplateRegistryEntry(id);
                    if (entry.templateIsLoaded) {
                        return '';
                    }
                    return that.importTemplate(load.address).then(function (template) {
                        entry.setTemplate(template);
                        return '';
                    });
                },
                'instantiate': function (load) {
                    return load.metadata.templateRegistryEntry;
                }
            }));
        }
    }
    DefaultLoader.prototype.loadModule = function (id) {
        var _this = this;
        return window.System.normalize(id).then(function (newId) {
            var existing = _this.moduleRegistry[newId];
            if (existing) {
                return existing;
            }
            return window.System.import(newId).then(function (m) {
                _this.moduleRegistry[newId] = m;
                return ensureOriginOnExports(m, newId);
            });
        });
    };
    DefaultLoader.prototype.loadAllModules = function (ids) {
        var loads = [];
        for (var _i = 0; _i < ids.length; _i++) {
            var id = ids[_i];
            loads.push(this.loadModule(id));
        }
        return Promise.all(loads);
    };
    DefaultLoader.prototype.loadTemplate = function (url) {
        if (window.System.polyfilled) {
            return window.System.import('view!' + url);
        }
        else {
            return window.System.import(url + '!view');
        }
    };
    return DefaultLoader;
})(aurelia_loader_1.Loader);
exports.DefaultLoader = DefaultLoader;
window.AureliaLoader = DefaultLoader;

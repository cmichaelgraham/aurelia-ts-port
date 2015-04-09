var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", './template-registry-entry'], function (require, exports, template_registry_entry_1) {
    var hasTemplateElement = ('content' in document.createElement('template'));
    function importElements(frag, link, callback) {
        document.head.appendChild(frag);
        if (window.Polymer && window.Polymer.whenReady) {
            window.Polymer.whenReady(callback);
        }
        else {
            link.addEventListener('load', callback);
        }
    }
    var Loader = (function () {
        function Loader() {
            this.templateRegistry = {};
        }
        Loader.prototype.loadModule = function (id) {
            throw new Error('Loaders must implement loadModule(id).');
        };
        Loader.prototype.loadAllModules = function (ids) {
            throw new Error('Loader must implement loadAllModules(ids).');
        };
        Loader.prototype.loadTemplate = function (url) {
            throw new Error('Loader must implement loadTemplate(url).');
        };
        Loader.prototype.getOrCreateTemplateRegistryEntry = function (id) {
            var entry = this.templateRegistry[id];
            if (entry === undefined) {
                this.templateRegistry[id] = entry = new template_registry_entry_1.TemplateRegistryEntry(id);
            }
            return entry;
        };
        Loader.prototype.importDocument = function (url) {
            return new Promise(function (resolve, reject) {
                var frag = document.createDocumentFragment();
                var link = document.createElement('link');
                link.rel = 'import';
                link.href = url;
                frag.appendChild(link);
                importElements(frag, link, function () { return resolve(link.import); });
            });
        };
        Loader.prototype.importTemplate = function (url) {
            var _this = this;
            return this.importDocument(url).then(function (doc) {
                return _this.findTemplate(doc, url);
            });
        };
        Loader.prototype.findTemplate = function (doc, url) {
            if (!hasTemplateElement) {
                HTMLTemplateElement.bootstrap(doc);
            }
            var template = doc.getElementsByTagName('template')[0];
            if (!template) {
                throw new Error("There was no template element found in '" + url + "'.");
            }
            return template;
        };
        return Loader;
    })();
    exports.Loader = Loader;
});

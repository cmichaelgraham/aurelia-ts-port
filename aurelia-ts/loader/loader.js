define(["require", "exports", './template-registry-entry'], function (require, exports, _template_registry_entry) {
    var hasTemplateElement = ('content' in document.createElement('template'));
    function importElements(frag, link, callback) {
        document.head.appendChild(frag);
        if (window.Polymer && Polymer.whenReady) {
            Polymer.whenReady(callback);
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
                this.templateRegistry[id] = entry = new _template_registry_entry.TemplateRegistryEntry(id);
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
                importElements(frag, link, function () {
                    return resolve(link.import);
                });
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
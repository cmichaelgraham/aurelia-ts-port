var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var aurelia_path_1 = require('aurelia-path');
function register(lookup, name, resource, type) {
    if (!name) {
        return;
    }
    var existing = lookup[name];
    if (existing) {
        if (existing != resource) {
            throw new Error("Attempted to register " + type + " when one with the same name already exists. Name: " + name + ".");
        }
        return;
    }
    lookup[name] = resource;
}
var ResourceRegistry = (function () {
    function ResourceRegistry() {
        this.attributes = {};
        this.elements = {};
        this.valueConverters = {};
        this.attributeMap = {};
        this.baseResourceUrl = '';
    }
    ResourceRegistry.prototype.registerElement = function (tagName, behavior) {
        register(this.elements, tagName, behavior, 'an Element');
    };
    ResourceRegistry.prototype.getElement = function (tagName) {
        return this.elements[tagName];
    };
    ResourceRegistry.prototype.registerAttribute = function (attribute, behavior, knownAttribute) {
        this.attributeMap[attribute] = knownAttribute;
        register(this.attributes, attribute, behavior, 'an Attribute');
    };
    ResourceRegistry.prototype.getAttribute = function (attribute) {
        return this.attributes[attribute];
    };
    ResourceRegistry.prototype.registerValueConverter = function (name, valueConverter) {
        register(this.valueConverters, name, valueConverter, 'a ValueConverter');
    };
    ResourceRegistry.prototype.getValueConverter = function (name) {
        return this.valueConverters[name];
    };
    return ResourceRegistry;
})();
exports.ResourceRegistry = ResourceRegistry;
var ViewResources = (function (_super) {
    __extends(ViewResources, _super);
    function ViewResources(parent, viewUrl) {
        _super.call(this);
        this.parent = parent;
        this.viewUrl = viewUrl;
        this.valueConverterLookupFunction = this.getValueConverter.bind(this);
    }
    ViewResources.prototype.relativeToView = function (path) {
        return aurelia_path_1.relativeToFile(path, this.viewUrl);
    };
    ViewResources.prototype.getElement = function (tagName) {
        return this.elements[tagName] || this.parent.getElement(tagName);
    };
    ViewResources.prototype.mapAttribute = function (attribute) {
        return this.attributeMap[attribute] || this.parent.attributeMap[attribute];
    };
    ViewResources.prototype.getAttribute = function (attribute) {
        return this.attributes[attribute] || this.parent.getAttribute(attribute);
    };
    ViewResources.prototype.getValueConverter = function (name) {
        return this.valueConverters[name] || this.parent.getValueConverter(name);
    };
    return ViewResources;
})(ResourceRegistry);
exports.ViewResources = ViewResources;

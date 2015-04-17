export declare class ResourceRegistry {
    attributes: any;
    elements: any;
    valueConverters: any;
    attributeMap: any;
    baseResourceUrl: any;
    constructor();
    registerElement(tagName: any, behavior: any): void;
    getElement(tagName: any): any;
    registerAttribute(attribute: any, behavior: any, knownAttribute: any): void;
    getAttribute(attribute: any): any;
    registerValueConverter(name: any, valueConverter: any): void;
    getValueConverter(name: any): any;
}
export declare class ViewResources extends ResourceRegistry {
    parent: any;
    viewUrl: any;
    valueConverterLookupFunction: any;
    constructor(parent: any, viewUrl: any);
    relativeToView(path: any): any;
    getElement(tagName: any): any;
    mapAttribute(attribute: any): any;
    getAttribute(attribute: any): any;
    getValueConverter(name: any): any;
}

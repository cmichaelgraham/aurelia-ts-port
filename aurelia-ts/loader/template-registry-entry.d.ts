export declare class TemplateDependency {
    src: any;
    name: any;
    constructor(src: any, name: any);
}
export declare class TemplateRegistryEntry {
    id: any;
    template: any;
    dependencies: any;
    resources: any;
    factory: any;
    constructor(id: any);
    templateIsLoaded: boolean;
    isReady: boolean;
    setTemplate(template: any): void;
    setResources(resources: any): void;
    setFactory(factory: any): void;
}

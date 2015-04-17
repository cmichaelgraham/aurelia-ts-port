export declare class Loader {
    templateRegistry: any;
    constructor();
    loadModule(id: any): void;
    loadAllModules(ids: any): void;
    loadTemplate(url: any): void;
    getOrCreateTemplateRegistryEntry(id: any): any;
    importDocument(url: any): Promise<{}>;
    importTemplate(url: any): Promise<any>;
    findTemplate(doc: any, url: any): any;
}

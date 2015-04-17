export declare class ViewEngine {
    static inject(): any[];
    loader: any;
    container: any;
    viewCompiler: any;
    moduleAnalyzer: any;
    appResources: any;
    constructor(loader: any, container: any, viewCompiler: any, moduleAnalyzer: any, appResources: any);
    loadViewFactory(urlOrRegistryEntry: any, compileOptions: any, associatedModuleId: any): any;
    loadTemplateResources(viewRegistryEntry: any, associatedModuleId: any): any;
    importViewModelResource(moduleImport: any, moduleMember: any): any;
    importViewResources(moduleIds: any, names: any, resources: any, associatedModuleId: any): any;
}

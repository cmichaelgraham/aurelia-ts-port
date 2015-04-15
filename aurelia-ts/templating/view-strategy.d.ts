export declare class ViewStrategy {
    makeRelativeTo(baseUrl: any): void;
    loadViewFactory(viewEngine: any, options: any): void;
    static normalize(value: any): any;
    static getDefault(target: any): any;
}
export declare class UseViewStrategy extends ViewStrategy {
    path: any;
    absolutePath: any;
    moduleId: any;
    constructor(path: any);
    loadViewFactory(viewEngine: any, options: any): any;
    makeRelativeTo(file: any): void;
}
export declare class ConventionalViewStrategy extends ViewStrategy {
    moduleId: any;
    viewUrl: any;
    constructor(moduleId: any);
    loadViewFactory(viewEngine: any, options: any): any;
    static convertModuleIdToViewUrl(moduleId: any): string;
}
export declare class NoViewStrategy extends ViewStrategy {
    loadViewFactory(): Promise<any>;
}
export declare class TemplateRegistryViewStrategy extends ViewStrategy {
    moduleId: any;
    registryEntry: any;
    constructor(moduleId: any, registryEntry: any);
    loadViewFactory(viewEngine: any, options: any): any;
}

import { Loader } from '../loader/index';
import { Container } from '../dependency-injection/index';
import { ViewCompiler } from './view-compiler';
import { ResourceRegistry } from './resource-registry';
import { ModuleAnalyzer } from './module-analyzer';
export declare class ViewEngine {
    static inject(): (typeof Container | typeof ResourceRegistry | typeof Loader | typeof ModuleAnalyzer | typeof ViewCompiler)[];
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

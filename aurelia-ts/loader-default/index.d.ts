import { Loader } from '../loader/index';
export declare class DefaultLoader extends Loader {
    moduleRegistry: any;
    constructor();
    loadModule(id: any): any;
    loadAllModules(ids: any): Promise<any[]>;
    loadTemplate(url: any): any;
}

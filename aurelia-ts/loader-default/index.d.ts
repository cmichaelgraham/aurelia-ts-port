import { Loader } from 'aurelia-loader';
export declare class DefaultLoader extends Loader {
    moduleRegistry: any;
    constructor();
    loadModule(id: any): any;
    loadAllModules(ids: any): Promise<any[]>;
    loadTemplate(url: any): any;
}

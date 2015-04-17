import { ViewFactory } from './view-factory';
import { BindingLanguage } from './binding-language';
export declare class ViewCompiler {
    bindingLanguage: any;
    static inject(): typeof BindingLanguage[];
    constructor(bindingLanguage: any);
    compile(templateOrFragment: any, resources: any, options?: any): ViewFactory;
    compileNode(node: any, resources: any, instructions: any, parentNode: any, parentInjectorId: any, targetLightDOM: any): any;
    compileElement(node: any, resources: any, instructions: any, parentNode: any, parentInjectorId: any, targetLightDOM: any): any;
}

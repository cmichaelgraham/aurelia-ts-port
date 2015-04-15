import { ResourceType } from '../metadata/index';
import { BehaviorInstance } from './behavior-instance';
export declare class TemplateController extends ResourceType {
    name: any;
    properties: any;
    attributes: any;
    liftsContent: any;
    apiName: any;
    target: any;
    constructor(attribute: any);
    static convention(name: any): TemplateController;
    analyze(container: any, target: any): void;
    load(container: any, target: any): Promise<TemplateController>;
    register(registry: any, name: any): void;
    compile(compiler: any, resources: any, node: any, instruction: any, parentNode: any): any;
    create(container: any, instruction: any, element: any): BehaviorInstance;
}

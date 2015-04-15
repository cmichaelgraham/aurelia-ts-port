import { ResourceType } from '../metadata/index';
import { BehaviorInstance } from './behavior-instance';
export declare class AttachedBehavior extends ResourceType {
    name: any;
    properties: any;
    attributes: any;
    target: any;
    apiName: any;
    childExpression: any;
    constructor(attribute: any);
    static convention(name: any): AttachedBehavior;
    analyze(container: any, target: any): void;
    load(container: any, target: any): Promise<AttachedBehavior>;
    register(registry: any, name: any): void;
    compile(compiler: any, resources: any, node: any, instruction: any): any;
    create(container: any, instruction: any, element: any, bindings: any): BehaviorInstance;
}

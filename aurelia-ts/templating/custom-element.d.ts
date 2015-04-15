import { ResourceType } from '../metadata/index';
import { BehaviorInstance } from './behavior-instance';
export declare class UseShadowDOM {
}
export declare class SkipContentProcessing {
}
export declare class CustomElement extends ResourceType {
    name: any;
    properties: any;
    attributes: any;
    targetShadowDOM: any;
    skipContentProcessing: any;
    usesShadowDOM: any;
    viewStrategy: any;
    moduleId: any;
    viewFactory: any;
    apiName: any;
    contentFactory: any;
    childExpression: any;
    target: any;
    constructor(tagName?: any);
    static convention(name: any): CustomElement;
    analyze(container: any, target: any): void;
    register(registry: any, name: any): void;
    load(container: any, target: any, viewStrategy?: any, transientView?: any): any;
    compile(compiler: any, resources: any, node: any, instruction: any): any;
    create(container: any, instruction?: any, element?: any): BehaviorInstance;
}

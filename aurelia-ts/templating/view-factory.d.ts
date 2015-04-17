export declare class BoundViewFactory {
    parentContainer: any;
    viewFactory: any;
    executionContext: any;
    factoryOptions: any;
    constructor(parentContainer: any, viewFactory: any, executionContext: any);
    create(executionContext: any): any;
}
export declare class ViewFactory {
    template: any;
    instructions: any;
    resources: any;
    constructor(template: any, instructions: any, resources: any);
    create(container: any, executionContext: any, options?: {
        systemControlled: boolean;
        suppressBind: boolean;
    }): any;
}

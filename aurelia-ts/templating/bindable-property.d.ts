export declare class BindableProperty {
    name: any;
    attribute: any;
    defaultBindingMode: any;
    owner: any;
    changeHandler: any;
    hasOptions: any;
    isDynamic: any;
    defaultValue: any;
    constructor(nameOrConfig: any);
    registerWith(target: any, behavior: any): void;
    defineOn(target: any, behavior: any): void;
    createObserver(executionContext: any): any;
    initialize(executionContext: any, observerLookup: any, attributes: any, behaviorHandlesBind: any, boundProperties: any): void;
    createDynamicProperty(executionContext: any, observerLookup: any, behaviorHandlesBind: any, name: any, attribute: any, boundProperties: any): void;
}

export declare class BehaviorProperty {
    name: any;
    changeHandler: any;
    attribute: any;
    defaultValue: any;
    defaultBindingMode: any;
    taskQueue: any;
    constructor(name?: any, changeHandler?: any, attribute?: any, defaultValue?: any, defaultBindingMode?: any);
    bindingIsTwoWay(): BehaviorProperty;
    bindingIsOneWay(): BehaviorProperty;
    bindingIsOneTime(): BehaviorProperty;
    define(taskQueue: any, behavior: any): void;
    createObserver(executionContext: any): any;
    initialize(executionContext: any, observerLookup: any, attributes: any, behaviorHandlesBind: any, boundProperties: any): void;
}
export declare class OptionsProperty extends BehaviorProperty {
    properties: any;
    hasOptions: any;
    isDynamic: any;
    constructor(attribute: any, ...rest: any[]);
    dynamic(): OptionsProperty;
    withProperty(name: any, changeHandler: any, attribute: any, defaultValue: any, defaultBindingMode: any): OptionsProperty;
    define(taskQueue: any, behavior: any): void;
    createObserver(executionContext: any): any;
    initialize(executionContext: any, observerLookup: any, attributes: any, behaviorHandlesBind: any, boundProperties: any): void;
    createDynamicProperty(executionContext: any, observerLookup: any, behaviorHandlesBind: any, name: any, attribute: any, boundProperties: any): void;
}

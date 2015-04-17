export declare class ComputedPropertyObserver {
    obj: any;
    propertyName: any;
    descriptor: any;
    observerLocator: any;
    callbacks: any;
    oldValue: any;
    subscriptions: any;
    constructor(obj: any, propertyName: any, descriptor: any, observerLocator: any);
    getValue(): any;
    setValue(newValue: any): void;
    trigger(newValue: any, oldValue: any): void;
    evaluate(): void;
    subscribe(callback: any): () => void;
}
export declare function hasDeclaredDependencies(descriptor: any): any;
export declare function declarePropertyDependencies(ctor: any, propertyName: any, dependencies: any): void;

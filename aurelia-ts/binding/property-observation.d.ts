export declare class SetterObserver {
    taskQueue: any;
    obj: any;
    propertyName: any;
    callbacks: any;
    queued: any;
    observing: any;
    currentValue: any;
    oldValue: any;
    constructor(taskQueue: any, obj: any, propertyName: any);
    getValue(): any;
    setValue(newValue: any): void;
    getterValue(): any;
    setterValue(newValue: any): void;
    call(): void;
    subscribe(callback: any): () => void;
    convertProperty(): void;
}
export declare class OoObjectObserver {
    obj: any;
    observers: any;
    observerLocator: any;
    observing: any;
    constructor(obj: any, observerLocator: any);
    subscribe(propertyObserver: any, callback: any): () => void;
    getObserver(propertyName: any, descriptor: any): any;
    handleChanges(changeRecords: any): void;
}
export declare class OoPropertyObserver {
    owner: any;
    obj: any;
    propertyName: any;
    callbacks: any;
    constructor(owner: any, obj: any, propertyName: any);
    getValue(): any;
    setValue(newValue: any): void;
    trigger(newValue: any, oldValue: any): void;
    subscribe(callback: any): any;
}
export declare class UndefinedPropertyObserver {
    owner: any;
    obj: any;
    propertyName: any;
    callbackMap: any;
    callbacks: any;
    actual: any;
    subscription: any;
    constructor(owner: any, obj: any, propertyName: any);
    getValue(): any;
    setValue(newValue: any): void;
    trigger(newValue: any, oldValue: any): void;
    getObserver(): void;
    subscribe(callback: any): any;
}

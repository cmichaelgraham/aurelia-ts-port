export declare class XLinkAttributeObserver {
    element: any;
    propertyName: any;
    attributeName: any;
    constructor(element: any, propertyName: any, attributeName: any);
    getValue(): any;
    setValue(newValue: any): any;
    subscribe(callback: any): void;
}
export declare class DataAttributeObserver {
    element: any;
    propertyName: any;
    constructor(element: any, propertyName: any);
    getValue(): any;
    setValue(newValue: any): any;
    subscribe(callback: any): void;
}
export declare class StyleObserver {
    element: any;
    propertyName: any;
    constructor(element: any, propertyName: any);
    getValue(): any;
    setValue(newValue: any): void;
    subscribe(callback: any): void;
    flattenCss(object: any): string;
}
export declare class ValueAttributeObserver {
    element: any;
    propertyName: any;
    handler: any;
    callbacks: any;
    oldValue: any;
    disposeHandler: any;
    constructor(element: any, propertyName: any, handler: any);
    getValue(): any;
    setValue(newValue: any): void;
    call(): void;
    subscribe(callback: any): any;
    unsubscribe(callback: any): void;
}
export declare class SelectValueObserver {
    element: any;
    handler: any;
    observerLocator: any;
    value: any;
    arraySubscription: any;
    initialSync: any;
    oldValue: any;
    callbacks: any;
    disposeHandler: any;
    domObserver: any;
    constructor(element: any, handler: any, observerLocator: any);
    getValue(): any;
    setValue(newValue: any): void;
    synchronizeOptions(): void;
    synchronizeValue(): void;
    call(): void;
    subscribe(callback: any): any;
    unsubscribe(callback: any): void;
    bind(): void;
    unbind(): void;
}
export declare class CheckedObserver {
    element: any;
    handler: any;
    observerLocator: any;
    value: any;
    arraySubscription: any;
    initialSync: any;
    oldValue: any;
    callbacks: any;
    disposeHandler: any;
    constructor(element: any, handler: any, observerLocator: any);
    getValue(): any;
    setValue(newValue: any): void;
    synchronizeElement(): void;
    synchronizeValue(): void;
    call(): void;
    subscribe(callback: any): any;
    unsubscribe(callback: any): void;
    unbind(): void;
}

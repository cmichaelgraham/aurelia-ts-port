export declare class ChildObserver {
    selector: any;
    changeHandler: any;
    property: any;
    constructor(property: any, changeHandler: any, selector: any);
    createBinding(target: any, behavior: any): ChildObserverBinder;
}
export declare class ChildObserverBinder {
    selector: any;
    target: any;
    property: any;
    behavior: any;
    changeHandler: any;
    observer: any;
    constructor(selector: any, target: any, property: any, behavior: any, changeHandler: any);
    bind(source: any): void;
    unbind(): void;
    onChange(mutations: any): void;
}

export declare class DirtyChecker {
    tracked: any;
    checkDelay: any;
    constructor();
    addProperty(property: any): void;
    removeProperty(property: any): void;
    scheduleDirtyCheck(): void;
    check(): void;
}
export declare class DirtyCheckProperty {
    dirtyChecker: any;
    obj: any;
    propertyName: any;
    callbacks: any;
    isSVG: any;
    oldValue: any;
    tracking: any;
    newValue: any;
    constructor(dirtyChecker: any, obj: any, propertyName: any);
    getValue(): any;
    setValue(newValue: any): void;
    call(): void;
    isDirty(): boolean;
    beginTracking(): void;
    endTracking(): void;
    subscribe(callback: any): () => void;
}

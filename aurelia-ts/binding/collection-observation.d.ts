export declare class ModifyCollectionObserver {
    taskQueue: any;
    queued: any;
    callbacks: any;
    changeRecords: any;
    oldCollection: any;
    collection: any;
    lengthPropertyName: any;
    lengthObserver: any;
    array: any;
    constructor(taskQueue: any, collection: any);
    subscribe(callback: any): () => void;
    addChangeRecord(changeRecord: any): void;
    reset(oldCollection: any): void;
    getObserver(propertyName: any): any;
    call(): void;
}
export declare class CollectionLengthObserver {
    collection: any;
    callbacks: any;
    lengthPropertyName: any;
    currentValue: any;
    constructor(collection: any);
    getValue(): any;
    setValue(newValue: any): void;
    subscribe(callback: any): () => void;
    call(newValue: any): void;
}

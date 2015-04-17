export declare class Repeat {
    viewFactory: any;
    viewSlot: any;
    observerLocator: any;
    local: any;
    key: any;
    value: any;
    items: any;
    executionContext: any;
    oldItems: any;
    disposeSubscription: any;
    lastBoundItems: any;
    constructor(viewFactory: any, viewSlot: any, observerLocator: any);
    bind(executionContext: any): void;
    unbind(): void;
    itemsChanged(): void;
    processItems(): void;
    processArrayItems(items: any): void;
    processMapEntries(items: any): void;
    createBaseExecutionContext(data: any): any;
    createBaseExecutionKvpContext(key: any, value: any): any;
    createFullExecutionContext(data: any, index: any, length: any): any;
    createFullExecutionKvpContext(key: any, value: any, index: any, length: any): any;
    updateExecutionContext(context: any, index: any, length: any): any;
    handleSplices(array: any, splices: any): void;
    handleMapChangeRecords(map: any, records: any): void;
    getViewIndexByKey(key: any): any;
}

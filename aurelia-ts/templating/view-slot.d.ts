export declare class ViewSlot {
    anchor: any;
    viewAddMethod: any;
    executionContext: any;
    animator: any;
    children: any;
    isBound: any;
    isAttached: any;
    contentSelectors: any;
    constructor(anchor: any, anchorIsContainer: any, executionContext?: any, animator?: any);
    transformChildNodesIntoView(): void;
    bind(executionContext: any): void;
    unbind(): void;
    add(view: any): void;
    insert(index: any, view: any): void;
    remove(view: any): void;
    removeAt(index: any): any;
    removeAll(): Promise<void>;
    swap(view: any): void;
    attached(): void;
    detached(): void;
    installContentSelectors(contentSelectors: any): void;
    contentSelectorAdd(view: any): void;
    contentSelectorInsert(index: any, view: any): void;
    contentSelectorRemove(view: any): void;
    contentSelectorRemoveAt(index: any): any;
    contentSelectorRemoveAll(): any;
}

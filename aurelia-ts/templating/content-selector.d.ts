export declare class ContentSelector {
    static applySelectors(view: any, contentSelectors: any, callback: any): void;
    anchor: any;
    selector: any;
    all: any;
    groups: any;
    constructor(anchor: any, selector: any);
    copyForViewSlot(): ContentSelector;
    matches(node: any): any;
    add(group: any): void;
    insert(index: any, group: any): void;
    removeAt(index: any, fragment: any): void;
}

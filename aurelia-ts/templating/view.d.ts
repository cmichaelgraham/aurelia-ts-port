export declare class View {
    fragment: any;
    behaviors: any;
    bindings: any;
    children: any;
    systemControlled: any;
    contentSelectors: any;
    firstChild: any;
    lastChild: any;
    isBound: any;
    isAttached: any;
    executionContext: any;
    owner: any;
    constructor(fragment: any, behaviors: any, bindings: any, children: any, systemControlled: any, contentSelectors: any);
    created(executionContext: any): void;
    bind(executionContext: any, systemUpdate: any): void;
    addBinding(binding: any): void;
    unbind(): void;
    insertNodesBefore(refNode: any): void;
    appendNodesTo(parent: any): void;
    removeNodes(): void;
    attached(): void;
    detached(): void;
}

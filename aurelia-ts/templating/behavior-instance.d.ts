export declare class BehaviorInstance {
    behavior: any;
    executionContext: any;
    isAttached: any;
    boundProperties: any;
    view: any;
    constructor(behavior: any, executionContext: any, instruction: any);
    created(context: any): void;
    bind(context: any): void;
    unbind(): void;
    attached(): void;
    detached(): void;
}

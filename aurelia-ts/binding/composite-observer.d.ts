export declare class CompositeObserver {
    subscriptions: any;
    evaluate: any;
    callback: any;
    constructor(observers: any, evaluate: any);
    subscribe(callback: any): () => void;
    notify(newValue: any): void;
    dispose(): void;
}

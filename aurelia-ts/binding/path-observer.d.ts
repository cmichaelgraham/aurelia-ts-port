export declare class PathObserver {
    leftObserver: any;
    disposeLeft: any;
    rightObserver: any;
    disposeRight: any;
    callback: any;
    constructor(leftObserver: any, getRightObserver: any, value: any);
    updateRight(observer: any): any;
    subscribe(callback: any): () => void;
    notify(newValue: any): void;
    dispose(): void;
}

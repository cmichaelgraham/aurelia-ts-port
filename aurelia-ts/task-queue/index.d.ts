export declare class TaskQueue {
    microTaskQueue: any;
    microTaskQueueCapacity: any;
    taskQueue: any;
    requestFlushMicroTaskQueue: any;
    requestFlushTaskQueue: any;
    constructor();
    queueMicroTask(task: any): void;
    queueTask(task: any): void;
    flushTaskQueue(): void;
    flushMicroTaskQueue(): void;
    onError(error: any, task: any): void;
}

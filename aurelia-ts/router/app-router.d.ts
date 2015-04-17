import { Router } from './router';
export declare class AppRouter extends Router {
    static inject(): any[];
    pipelineProvider: any;
    events: any;
    history: any;
    queue: any;
    isNavigating: any;
    isActive: any;
    container: any;
    options: any;
    constructor(container: any, history: any, pipelineProvider: any, events: any);
    isRoot: boolean;
    loadUrl(url: any): any;
    queueInstruction(instruction: any): Promise<{}>;
    dequeueInstruction(): void;
    registerViewPort(viewPort: any, name: any): any;
    activate(options?: any): void;
    deactivate(): void;
    reset(): void;
}

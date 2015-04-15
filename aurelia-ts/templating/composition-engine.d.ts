import { ViewEngine } from './view-engine';
export declare class CompositionEngine {
    static inject(): typeof ViewEngine[];
    viewEngine: any;
    constructor(viewEngine: any);
    activate(instruction: any): any;
    createBehaviorAndSwap(instruction: any): any;
    createBehavior(instruction: any): any;
    createViewModel(instruction: any): any;
    compose(instruction: any): any;
}

import { Pipeline } from './pipeline';
export declare class PipelineProvider {
    static inject(): any[];
    container: any;
    steps: any;
    constructor(container: any);
    createPipeline(navigationContext: any): Pipeline;
}

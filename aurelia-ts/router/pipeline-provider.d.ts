import { Container } from '../dependency-injection/index';
import { Pipeline } from './pipeline';
export declare class PipelineProvider {
    static inject(): typeof Container[];
    container: any;
    steps: any;
    constructor(container: any);
    createPipeline(navigationContext: any): Pipeline;
}

import { Container } from '../dependency-injection/index';
export declare class RouteFilterContainer {
    static inject(): typeof Container[];
    container: any;
    filters: any;
    filterCache: any;
    constructor(container: any);
    addStep(name: any, step: any, index?: number): void;
    getFilterSteps(name: any): any;
}
export declare function createRouteFilterStep(name: any): any;

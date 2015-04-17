import { RouteLoader } from 'aurelia-router';
export declare class TemplatingRouteLoader extends RouteLoader {
    compositionEngine: any;
    constructor(compositionEngine: any);
    loadRoute(router: any, config: any): any;
}

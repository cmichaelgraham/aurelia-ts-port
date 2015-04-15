import { RouteLoader } from '../router/index';
export declare class TemplatingRouteLoader extends RouteLoader {
    compositionEngine: any;
    constructor(compositionEngine: any);
    loadRoute(router: any, config: any): any;
}

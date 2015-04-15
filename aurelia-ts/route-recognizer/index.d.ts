export declare class RouteRecognizer {
    map: any;
    rootState: any;
    names: any;
    constructor();
    add(route: any): any;
    handlersFor(name: any): any[];
    hasRoute(name: any): boolean;
    generate(name: any, params: any): string;
    generateQueryString(params: any): string;
    parseQueryString(queryString: any): {};
    recognize(path: any): any;
}

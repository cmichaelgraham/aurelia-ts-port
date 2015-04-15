import { Router } from '../router/index';
export declare class ChildRouter {
    static inject(): typeof Router[];
    heading: string;
    router: any;
    constructor(router: any);
}

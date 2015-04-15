import { HttpClient } from '../http-client/index';
export declare class Flickr {
    static inject(): typeof HttpClient[];
    heading: string;
    images: any[];
    http: any;
    url: string;
    constructor(http: any);
    activate(): any;
    canDeactivate(): boolean;
}

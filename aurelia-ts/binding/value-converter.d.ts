import { ResourceType } from 'aurelia-metadata';
export declare class ValueConverterResource extends ResourceType {
    name: any;
    instance: any;
    constructor(name: any);
    static convention(name: any): ValueConverterResource;
    analyze(container: any, target: any): void;
    register(registry: any, name: any): void;
    load(container: any, target: any): Promise<ValueConverterResource>;
}

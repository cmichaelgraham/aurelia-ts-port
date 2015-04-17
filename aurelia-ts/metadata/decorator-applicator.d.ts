export declare class DecoratorApplicator {
    private _first;
    private _second;
    private _third;
    private _rest;
    constructor();
    decorator(decorator: any): DecoratorApplicator;
    _decorate(target: any): void;
}

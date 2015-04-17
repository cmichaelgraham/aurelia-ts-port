export declare class EventManager {
    elementHandlerLookup: any;
    eventStrategyLookup: any;
    defaultEventStrategy: any;
    constructor();
    registerElementConfig(config: any): void;
    registerElementPropertyConfig(tagName: any, propertyName: any, events: any): void;
    registerElementHandler(tagName: any, handler: any): void;
    registerEventStrategy(eventName: any, strategy: any): void;
    getElementHandler(target: any, propertyName: any): any;
    addEventListener(target: any, targetEvent: any, callback: any, delegate: any): any;
}

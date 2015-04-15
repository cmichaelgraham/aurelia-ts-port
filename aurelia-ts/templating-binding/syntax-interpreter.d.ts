import { Parser, ObserverLocator, EventManager, ListenerExpression } from '../binding/index';
export declare class SyntaxInterpreter {
    static inject(): (typeof EventManager | typeof ObserverLocator | typeof Parser)[];
    parser: any;
    observerLocator: any;
    eventManager: any;
    attributeMap: any;
    language: any;
    constructor(parser: any, observerLocator: any, eventManager: any);
    interpret(resources: any, element: any, info: any, existingInstruction: any): any;
    handleUnknownCommand(resources: any, element: any, info: any, existingInstruction: any): any;
    determineDefaultBindingMode(element: any, attrName: any): number;
    bind(resources: any, element: any, info: any, existingInstruction: any): any;
    trigger(resources: any, element: any, info: any): ListenerExpression;
    delegate(resources: any, element: any, info: any): ListenerExpression;
    call(resources: any, element: any, info: any, existingInstruction: any): any;
    options(resources: any, element: any, info: any, existingInstruction: any): any;
}

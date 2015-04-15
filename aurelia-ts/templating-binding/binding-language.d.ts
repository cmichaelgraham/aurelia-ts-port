import { BindingLanguage } from '../templating/index';
import { Parser, ObserverLocator } from '../binding/index';
import { SyntaxInterpreter } from './syntax-interpreter';
export declare class TemplatingBindingLanguage extends BindingLanguage {
    static inject(): (typeof ObserverLocator | typeof Parser | typeof SyntaxInterpreter)[];
    parser: any;
    observerLocator: any;
    syntaxInterpreter: any;
    emptyStringExpression: any;
    attributeMap: any;
    constructor(parser: any, observerLocator: any, syntaxInterpreter: any);
    inspectAttribute(resources: any, attrName: any, attrValue: any): any;
    createAttributeInstruction(resources: any, element: any, info: any, existingInstruction: any): any;
    parseText(resources: any, value: any): InterpolationBindingExpression;
    parseContent(resources: any, attrName: any, attrValue: any): InterpolationBindingExpression;
}
export declare class InterpolationBindingExpression {
    observerLocator: any;
    targetProperty: any;
    parts: any;
    mode: any;
    valueConverterLookupFunction: any;
    attribute: any;
    discrete: any;
    constructor(observerLocator: any, targetProperty: any, parts: any, mode: any, valueConverterLookupFunction: any, attribute: any);
    createBinding(target: any): any;
}

declare module 'aurelia-templating-binding/syntax-interpreter' {
	import { Parser, ObserverLocator, EventManager, ListenerExpression } from 'binding\index';
	export class SyntaxInterpreter {
	    static inject(): (typeof Parser | typeof ObserverLocator | typeof EventManager)[];
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

}
declare module 'aurelia-templating-binding/index' {
	 function install(aurelia: any): void;
	export { TemplatingBindingLanguage, SyntaxInterpreter, install };

}
declare module 'aurelia-templating-binding' {
	import main = require('aurelia-templating-binding/index');
	export = main;
}

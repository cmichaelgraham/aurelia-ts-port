declare module 'aurelia-templating/animator' {
	export class Animator {
	    static instance: any;
	    static configureDefault(container: any, animatorInstance?: any): void;
	    move(): Promise<boolean>;
	    enter(element: any): Promise<boolean>;
	    leave(element: any): Promise<boolean>;
	    removeClass(element: any, className: any): Promise<boolean>;
	    addClass(element: any, className: any): Promise<boolean>;
	}

}
declare module 'aurelia-templating/behavior-instance' {
	export class BehaviorInstance {
	    behavior: any;
	    executionContext: any;
	    isAttached: any;
	    boundProperties: any;
	    view: any;
	    constructor(behavior: any, executionContext: any, instruction: any);
	    created(context: any): void;
	    bind(context: any): void;
	    unbind(): void;
	    attached(): void;
	    detached(): void;
	}

}
declare module 'aurelia-templating/children' {
	export class ChildObserver {
	    selector: any;
	    changeHandler: any;
	    property: any;
	    constructor(property: any, changeHandler: any, selector: any);
	    createBinding(target: any, behavior: any): ChildObserverBinder;
	}
	export class ChildObserverBinder {
	    selector: any;
	    target: any;
	    property: any;
	    behavior: any;
	    changeHandler: any;
	    observer: any;
	    constructor(selector: any, target: any, property: any, behavior: any, changeHandler: any);
	    bind(source: any): void;
	    unbind(): void;
	    onChange(mutations: any): void;
	}

}
declare module 'aurelia-templating/util' {
	export function hyphenate(name: any): any;

}
declare module 'aurelia-templating/behaviors' {
	export function configureBehavior(container: any, behavior: any, target: any, valuePropertyName?: any): void;

}
declare module 'aurelia-templating/attached-behavior' {
	import { ResourceType } from 'aurelia-metadata';
	import { BehaviorInstance } from 'aurelia-templating\behavior-instance';
	export class AttachedBehavior extends ResourceType {
	    name: any;
	    properties: any;
	    attributes: any;
	    target: any;
	    apiName: any;
	    childExpression: any;
	    constructor(attribute: any);
	    static convention(name: any): AttachedBehavior;
	    analyze(container: any, target: any): void;
	    load(container: any, target: any): Promise<AttachedBehavior>;
	    register(registry: any, name: any): void;
	    compile(compiler: any, resources: any, node: any, instruction: any): any;
	    create(container: any, instruction: any, element: any, bindings: any): BehaviorInstance;
	}

declare module 'aurelia-route-recognizer/dsl' {
	export function map(callback: any, addRouteCallback: any): void;

}
declare module 'aurelia-route-recognizer/state' {
	export class State {
	    charSpec: any;
	    nextStates: any;
	    constructor(charSpec?: any);
	    get(charSpec: any): any;
	    put(charSpec: any): any;
	    match(ch: any): any[];
	}

}
declare module 'aurelia-route-recognizer/segments' {
	export class StaticSegment {
	    string: any;
	    constructor(string: any);
	    eachChar(callback: any): void;
	    regex(): any;
	    generate(): any;
	}
	export class DynamicSegment {
	    name: any;
	    constructor(name: any);
	    eachChar(callback: any): void;
	    regex(): string;
	    generate(params: any, consumed: any): any;
	}
	export class StarSegment {
	    name: any;
	    constructor(name: any);
	    eachChar(callback: any): void;
	    regex(): string;
	    generate(params: any, consumed: any): any;
	}
	export class EpsilonSegment {
	    eachChar(): void;
	    regex(): string;
	    generate(): string;
	}

}
declare module 'aurelia-route-recognizer' {
	export * from 'aurelia-route-recognizer/index';
}

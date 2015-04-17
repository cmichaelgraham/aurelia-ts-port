declare module 'aurelia-binding/array-change-records' {
	export function calcSplices(current: any, currentStart: any, currentEnd: any, old: any, oldStart: any, oldEnd: any): any;
	export function projectArraySplices(array: any, changeRecords: any): any[];

}
declare module 'aurelia-binding/map-change-records' {
	export function getChangeRecords(map: any): any[];

}
declare module 'aurelia-binding/collection-observation' {
	export class ModifyCollectionObserver {
	    taskQueue: any;
	    queued: any;
	    callbacks: any;
	    changeRecords: any;
	    oldCollection: any;
	    collection: any;
	    lengthPropertyName: any;
	    lengthObserver: any;
	    array: any;
	    constructor(taskQueue: any, collection: any);
	    subscribe(callback: any): () => void;
	    addChangeRecord(changeRecord: any): void;
	    reset(oldCollection: any): void;
	    getObserver(propertyName: any): any;
	    call(): void;
	}
	export class CollectionLengthObserver {
	    collection: any;
	    callbacks: any;
	    lengthPropertyName: any;
	    currentValue: any;
	    constructor(collection: any);
	    getValue(): any;
	    setValue(newValue: any): void;
	    subscribe(callback: any): () => void;
	    call(newValue: any): void;
	}

}
declare module 'aurelia-binding/array-observation' {
	export function getArrayObserver(taskQueue: any, array: any): any;

}
declare module 'aurelia-binding/path-observer' {
	export class PathObserver {
	    leftObserver: any;
	    disposeLeft: any;
	    rightObserver: any;
	    disposeRight: any;
	    callback: any;
	    constructor(leftObserver: any, getRightObserver: any, value: any);
	    updateRight(observer: any): any;
	    subscribe(callback: any): () => void;
	    notify(newValue: any): void;
	    dispose(): void;
	}

}
declare module 'aurelia-binding/composite-observer' {
	export class CompositeObserver {
	    subscriptions: any;
	    evaluate: any;
	    callback: any;
	    constructor(observers: any, evaluate: any);
	    subscribe(callback: any): () => void;
	    notify(newValue: any): void;
	    dispose(): void;
	}

import { TaskQueue } from '../task-queue/index';
import { EventManager } from './event-manager';
import { DirtyChecker } from './dirty-checking';
import { All } from '../dependency-injection/index';
export declare class ObserverLocator {
    taskQueue: any;
    eventManager: any;
    dirtyChecker: any;
    observationAdapters: any;
    static inject(): (typeof DirtyChecker | typeof EventManager | typeof TaskQueue | All)[];
    constructor(taskQueue: any, eventManager: any, dirtyChecker: any, observationAdapters: any);
    getObserversLookup(obj: any): any;
    getObserver(obj: any, propertyName: any): any;
    getObservationAdapter(obj: any, propertyName: any, descriptor: any): any;
    createPropertyObserver(obj: any, propertyName: any): any;
    getArrayObserver(array: any): any;
    getMapObserver(map: any): any;
}
export declare class ObjectObservationAdapter {
    handlesProperty(object: any, propertyName: any, descriptor: any): void;
    getObserver(object: any, propertyName: any, descriptor: any): void;
}

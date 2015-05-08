var aurelia_task_queue_1 = require('aurelia-task-queue');
var environment_1 = require('./environment');
var array_observation_1 = require('./array-observation');
var map_observation_1 = require('./map-observation');
var event_manager_1 = require('./event-manager');
var dirty_checking_1 = require('./dirty-checking');
var property_observation_1 = require('./property-observation');
var element_observation_1 = require('./element-observation');
var index_1 = require('../dependency-injection/index');
var computed_observation_1 = require('./computed-observation');
if (typeof Object.getPropertyDescriptor !== 'function') {
    Object.getPropertyDescriptor = function (subject, name) {
        var pd = Object.getOwnPropertyDescriptor(subject, name);
        var proto = Object.getPrototypeOf(subject);
        while (typeof pd === 'undefined' && proto !== null) {
            pd = Object.getOwnPropertyDescriptor(proto, name);
            proto = Object.getPrototypeOf(proto);
        }
        return pd;
    };
}
function createObserversLookup(obj) {
    var value = {};
    try {
        Object.defineProperty(obj, "__observers__", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value
        });
    }
    catch (_) { }
    return value;
}
function createObserverLookup(obj, observerLocator) {
    var value = new property_observation_1.OoObjectObserver(obj, observerLocator);
    try {
        Object.defineProperty(obj, "__observer__", {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value
        });
    }
    catch (_) { }
    return value;
}
var ObserverLocator = (function () {
    function ObserverLocator(taskQueue, eventManager, dirtyChecker, observationAdapters) {
        this.taskQueue = taskQueue;
        this.eventManager = eventManager;
        this.dirtyChecker = dirtyChecker;
        this.observationAdapters = observationAdapters;
    }
    ObserverLocator.inject = function () { return [aurelia_task_queue_1.TaskQueue, event_manager_1.EventManager, dirty_checking_1.DirtyChecker, index_1.All.of(ObjectObservationAdapter)]; };
    ObserverLocator.prototype.getObserversLookup = function (obj) {
        return obj.__observers__ || createObserversLookup(obj);
    };
    ObserverLocator.prototype.getObserver = function (obj, propertyName) {
        var observersLookup = this.getObserversLookup(obj);
        if (propertyName in observersLookup) {
            return observersLookup[propertyName];
        }
        return observersLookup[propertyName] = this.createPropertyObserver(obj, propertyName);
    };
    ObserverLocator.prototype.getObservationAdapter = function (obj, propertyName, descriptor) {
        var i, ii, observationAdapter;
        for (i = 0, ii = this.observationAdapters.length; i < ii; i++) {
            observationAdapter = this.observationAdapters[i];
            if (observationAdapter.handlesProperty(obj, propertyName, descriptor))
                return observationAdapter;
        }
        return null;
    };
    ObserverLocator.prototype.createPropertyObserver = function (obj, propertyName) {
        var observerLookup, descriptor, handler, observationAdapter, xlinkResult;
        if (obj instanceof Element) {
            handler = this.eventManager.getElementHandler(obj, propertyName);
            if (propertyName === 'value' && obj.tagName.toLowerCase() === 'select') {
                return new element_observation_1.SelectValueObserver(obj, handler, this);
            }
            if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
                return new element_observation_1.CheckedObserver(obj, handler, this);
            }
            if (handler) {
                return new element_observation_1.ValueAttributeObserver(obj, propertyName, handler);
            }
            xlinkResult = /^xlink:(.+)$/.exec(propertyName);
            if (xlinkResult) {
                return new element_observation_1.XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
            }
            if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof SVGElement) {
                return new element_observation_1.DataAttributeObserver(obj, propertyName);
            }
            if (propertyName === 'style' || propertyName === 'css') {
                return new element_observation_1.StyleObserver(obj, propertyName);
            }
        }
        descriptor = Object.getPropertyDescriptor(obj, propertyName);
        if (computed_observation_1.hasDeclaredDependencies(descriptor)) {
            return new computed_observation_1.ComputedPropertyObserver(obj, propertyName, descriptor, this);
        }
        if (descriptor && (descriptor.get || descriptor.set)) {
            // attempt to use an adapter before resorting to dirty checking.
            observationAdapter = this.getObservationAdapter(obj, propertyName, descriptor);
            if (observationAdapter)
                return observationAdapter.getObserver(obj, propertyName, descriptor);
            return new dirty_checking_1.DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
        }
        if (environment_1.hasObjectObserve) {
            observerLookup = obj.__observer__ || createObserverLookup(obj, this);
            return observerLookup.getObserver(propertyName, descriptor);
        }
        if (obj instanceof Array) {
            observerLookup = this.getArrayObserver(obj);
            return observerLookup.getObserver(propertyName);
        }
        else if (obj instanceof Map) {
            observerLookup = this.getMapObserver(obj);
            return observerLookup.getObserver(propertyName);
        }
        return new property_observation_1.SetterObserver(this.taskQueue, obj, propertyName);
    };
    ObserverLocator.prototype.getArrayObserver = function (array) {
        if ('__array_observer__' in array) {
            return array.__array_observer__;
        }
        return array.__array_observer__ = array_observation_1.getArrayObserver(this.taskQueue, array);
    };
    ObserverLocator.prototype.getMapObserver = function (map) {
        if ('__map_observer__' in map) {
            return map.__map_observer__;
        }
        return map.__map_observer__ = map_observation_1.getMapObserver(this.taskQueue, map);
    };
    return ObserverLocator;
})();
exports.ObserverLocator = ObserverLocator;
var ObjectObservationAdapter = (function () {
    function ObjectObservationAdapter() {
    }
    ObjectObservationAdapter.prototype.handlesProperty = function (object, propertyName, descriptor) {
        throw new Error('BindingAdapters must implement handlesProperty(object, propertyName).');
    };
    ObjectObservationAdapter.prototype.getObserver = function (object, propertyName, descriptor) {
        throw new Error('BindingAdapters must implement createObserver(object, propertyName).');
    };
    return ObjectObservationAdapter;
})();
exports.ObjectObservationAdapter = ObjectObservationAdapter;

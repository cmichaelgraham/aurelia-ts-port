define(["require", "exports", '../task-queue/index', './array-observation', './map-observation', './event-manager', './dirty-checking', './property-observation', './element-observation', '../dependency-injection/index', './computed-observation'], function (require, exports, _index, _array_observation, _map_observation, _event_manager, _dirty_checking, _property_observation, _element_observation, _index_1, _computed_observation) {
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
    var hasObjectObserve = (function detectObjectObserve() {
        if (typeof Object.observe !== 'function') {
            return false;
        }
        var records = [];
        function callback(recs) {
            records = recs;
        }
        var test = {};
        Object.observe(test, callback);
        test.id = 1;
        test.id = 2;
        delete test.id;
        Object.deliverChangeRecords(callback);
        if (records.length !== 3)
            return false;
        if (records[0].type != 'add' || records[1].type != 'update' || records[2].type != 'delete') {
            return false;
        }
        Object.unobserve(test, callback);
        return true;
    })();
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
        catch (_) {
        }
        return value;
    }
    function createObserverLookup(obj, observerLocator) {
        var value = new _property_observation.OoObjectObserver(obj, observerLocator);
        try {
            Object.defineProperty(obj, "__observer__", {
                enumerable: false,
                configurable: false,
                writable: false,
                value: value
            });
        }
        catch (_) {
        }
        return value;
    }
    var ObserverLocator = (function () {
        function ObserverLocator(taskQueue, eventManager, dirtyChecker, observationAdapters) {
            this.taskQueue = taskQueue;
            this.eventManager = eventManager;
            this.dirtyChecker = dirtyChecker;
            this.observationAdapters = observationAdapters;
        }
        ObserverLocator.inject = function () {
            return [
                _index.TaskQueue,
                _event_manager.EventManager,
                _dirty_checking.DirtyChecker,
                _index_1.All.of(ObjectObservationAdapter)
            ];
        };
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
                    return new _element_observation.SelectValueObserver(obj, handler, this);
                }
                if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
                    return new _element_observation.CheckedObserver(obj, handler, this);
                }
                if (handler) {
                    return new _element_observation.ValueAttributeObserver(obj, propertyName, handler);
                }
                xlinkResult = /^xlink:(.+)$/.exec(propertyName);
                if (xlinkResult) {
                    return new _element_observation.XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
                }
                if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof SVGElement) {
                    return new _element_observation.DataAttributeObserver(obj, propertyName);
                }
                if (propertyName === 'style' || propertyName === 'css') {
                    return new _element_observation.StyleObserver(obj, propertyName);
                }
            }
            descriptor = Object.getPropertyDescriptor(obj, propertyName);
            if (_computed_observation.hasDeclaredDependencies(descriptor)) {
                return new _computed_observation.ComputedPropertyObserver(obj, propertyName, descriptor, this);
            }
            if (descriptor && (descriptor.get || descriptor.set)) {
                // attempt to use an adapter before resorting to dirty checking.
                observationAdapter = this.getObservationAdapter(obj, propertyName, descriptor);
                if (observationAdapter)
                    return observationAdapter.getObserver(obj, propertyName, descriptor);
                return new _dirty_checking.DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
            }
            if (hasObjectObserve) {
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
            return new _property_observation.SetterObserver(this.taskQueue, obj, propertyName);
        };
        ObserverLocator.prototype.getArrayObserver = function (array) {
            if ('__array_observer__' in array) {
                return array.__array_observer__;
            }
            return array.__array_observer__ = _array_observation.getArrayObserver(this.taskQueue, array);
        };
        ObserverLocator.prototype.getMapObserver = function (map) {
            if ('__map_observer__' in map) {
                return map.__map_observer__;
            }
            return map.__map_observer__ = _map_observation.getMapObserver(this.taskQueue, map);
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
});

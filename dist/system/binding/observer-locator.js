System.register(['aurelia-task-queue', './environment', './array-observation', './map-observation', './event-manager', './dirty-checking', './property-observation', './element-observation', '../dependency-injection/index', './computed-observation'], function(exports_1) {
    var aurelia_task_queue_1, environment_1, array_observation_1, map_observation_1, event_manager_1, dirty_checking_1, property_observation_1, element_observation_1, index_1, computed_observation_1;
    var ObserverLocator, ObjectObservationAdapter;
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
    return {
        setters:[
            function (_aurelia_task_queue_1) {
                aurelia_task_queue_1 = _aurelia_task_queue_1;
            },
            function (_environment_1) {
                environment_1 = _environment_1;
            },
            function (_array_observation_1) {
                array_observation_1 = _array_observation_1;
            },
            function (_map_observation_1) {
                map_observation_1 = _map_observation_1;
            },
            function (_event_manager_1) {
                event_manager_1 = _event_manager_1;
            },
            function (_dirty_checking_1) {
                dirty_checking_1 = _dirty_checking_1;
            },
            function (_property_observation_1) {
                property_observation_1 = _property_observation_1;
            },
            function (_element_observation_1) {
                element_observation_1 = _element_observation_1;
            },
            function (_index_1) {
                index_1 = _index_1;
            },
            function (_computed_observation_1) {
                computed_observation_1 = _computed_observation_1;
            }],
        execute: function() {
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
            ObserverLocator = (function () {
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
            exports_1("ObserverLocator", ObserverLocator);
            ObjectObservationAdapter = (function () {
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
            exports_1("ObjectObservationAdapter", ObjectObservationAdapter);
        }
    }
});

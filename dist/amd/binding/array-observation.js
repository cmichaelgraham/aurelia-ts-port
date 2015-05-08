var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './environment', './array-change-records', './collection-observation'], function (require, exports, environment_1, array_change_records_1, collection_observation_1) {
    var arrayProto = Array.prototype;
    function getArrayObserver(taskQueue, array) {
        if (environment_1.hasArrayObserve) {
            return new ArrayObserveObserver(array);
        }
        else {
            return ModifyArrayObserver.create(taskQueue, array);
        }
    }
    exports.getArrayObserver = getArrayObserver;
    var ModifyArrayObserver = (function (_super) {
        __extends(ModifyArrayObserver, _super);
        function ModifyArrayObserver(taskQueue, array) {
            _super.call(this, taskQueue, array);
        }
        ModifyArrayObserver.create = function (taskQueue, array) {
            var observer = new ModifyArrayObserver(taskQueue, array);
            array['pop'] = function () {
                var methodCallResult = arrayProto['pop'].apply(array, arguments);
                observer.addChangeRecord({
                    type: 'delete',
                    object: array,
                    name: array.length,
                    oldValue: methodCallResult
                });
                return methodCallResult;
            };
            array['push'] = function () {
                var methodCallResult = arrayProto['push'].apply(array, arguments);
                observer.addChangeRecord({
                    type: 'splice',
                    object: array,
                    index: array.length - arguments.length,
                    removed: [],
                    addedCount: arguments.length
                });
                return methodCallResult;
            };
            array['reverse'] = function () {
                var oldArray = array.slice();
                var methodCallResult = arrayProto['reverse'].apply(array, arguments);
                observer.reset(oldArray);
                return methodCallResult;
            };
            array['shift'] = function () {
                var methodCallResult = arrayProto['shift'].apply(array, arguments);
                observer.addChangeRecord({
                    type: 'delete',
                    object: array,
                    name: 0,
                    oldValue: methodCallResult
                });
                return methodCallResult;
            };
            array['sort'] = function () {
                var oldArray = array.slice();
                var methodCallResult = arrayProto['sort'].apply(array, arguments);
                observer.reset(oldArray);
                return methodCallResult;
            };
            array['splice'] = function () {
                var methodCallResult = arrayProto['splice'].apply(array, arguments);
                observer.addChangeRecord({
                    type: 'splice',
                    object: array,
                    index: arguments[0],
                    removed: methodCallResult,
                    addedCount: arguments.length > 2 ? arguments.length - 2 : 0
                });
                return methodCallResult;
            };
            array['unshift'] = function () {
                var methodCallResult = arrayProto['unshift'].apply(array, arguments);
                observer.addChangeRecord({
                    type: 'splice',
                    object: array,
                    index: 0,
                    removed: [],
                    addedCount: arguments.length
                });
                return methodCallResult;
            };
            return observer;
        };
        return ModifyArrayObserver;
    })(collection_observation_1.ModifyCollectionObserver);
    var ArrayObserveObserver = (function () {
        function ArrayObserveObserver(array) {
            this.array = array;
            this.callbacks = [];
            this.observing = false;
        }
        ArrayObserveObserver.prototype.subscribe = function (callback) {
            var _this = this;
            var callbacks = this.callbacks;
            callbacks.push(callback);
            if (!this.observing) {
                this.observing = true;
                Array.observe(this.array, function (changes) { return _this.handleChanges(changes); });
            }
            return function () {
                callbacks.splice(callbacks.indexOf(callback), 1);
            };
        };
        ArrayObserveObserver.prototype.getLengthObserver = function () {
            return this.lengthObserver || (this.lengthObserver = new collection_observation_1.CollectionLengthObserver(this.array));
        };
        ArrayObserveObserver.prototype.handleChanges = function (changeRecords) {
            var callbacks = this.callbacks, i = callbacks.length, splices;
            if (i) {
                splices = array_change_records_1.projectArraySplices(this.array, changeRecords);
                while (i--) {
                    callbacks[i](splices);
                }
            }
            if (this.lengthObserver) {
                this.lengthObserver.call(this.array.length);
            }
        };
        return ArrayObserveObserver;
    })();
});

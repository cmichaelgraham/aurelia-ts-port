var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", './array-change-records', './collection-observation'], function (require, exports, array_change_records_1, collection_observation_1) {
    var arrayProto = Array.prototype, hasArrayObserve = (function detectArrayObserve() {
        if (typeof Array.observe !== 'function') {
            return false;
        }
        var records = [];
        function callback(recs) {
            records = recs;
        }
        var arr = [];
        Array.observe(arr, callback);
        arr.push(1, 2);
        arr.length = 0;
        Object.deliverChangeRecords(callback);
        if (records.length !== 2)
            return false;
        if (records[0].type != 'splice' ||
            records[1].type != 'splice') {
            return false;
        }
        Array.unobserve(arr, callback);
        return true;
    })();
    function getArrayObserver(taskQueue, array) {
        if (hasArrayObserve) {
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
        ArrayObserveObserver.prototype.getObserver = function (propertyName) {
            if (propertyName == 'length') {
                return this.lengthObserver || (this.lengthObserver = new collection_observation_1.CollectionLengthObserver(this.array));
            }
            else {
                throw new Error("You cannot observe the " + propertyName + " property of an array.");
            }
        };
        ArrayObserveObserver.prototype.handleChanges = function (changeRecords) {
            var callbacks = this.callbacks, i = callbacks.length, splices;
            if (!i) {
                return;
            }
            splices = array_change_records_1.projectArraySplices(this.array, changeRecords);
            while (i--) {
                callbacks[i](splices);
            }
            if (this.lengthObserver) {
                this.lengthObserver.call(this.array.length);
            }
        };
        return ArrayObserveObserver;
    })();
});

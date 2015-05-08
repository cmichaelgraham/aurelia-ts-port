var array_change_records_1 = require('./array-change-records');
var map_change_records_1 = require('./map-change-records');
var ModifyCollectionObserver = (function () {
    function ModifyCollectionObserver(taskQueue, collection) {
        this.taskQueue = taskQueue;
        this.queued = false;
        this.callbacks = [];
        this.changeRecords = [];
        this.oldCollection = null;
        this.collection = collection;
        this.lengthPropertyName = collection instanceof Map ? 'size' : 'length';
    }
    ModifyCollectionObserver.prototype.subscribe = function (callback) {
        var callbacks = this.callbacks;
        callbacks.push(callback);
        return function () {
            callbacks.splice(callbacks.indexOf(callback), 1);
        };
    };
    ModifyCollectionObserver.prototype.addChangeRecord = function (changeRecord) {
        if (this.callbacks.length === 0 && !this.lengthObserver) {
            return;
        }
        this.changeRecords.push(changeRecord);
        if (!this.queued) {
            this.queued = true;
            this.taskQueue.queueMicroTask(this);
        }
    };
    ModifyCollectionObserver.prototype.reset = function (oldCollection) {
        if (!this.callbacks.length) {
            return;
        }
        this.oldCollection = oldCollection;
        if (!this.queued) {
            this.queued = true;
            this.taskQueue.queueMicroTask(this);
        }
    };
    ModifyCollectionObserver.prototype.getLengthObserver = function () {
        return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.collection));
    };
    ModifyCollectionObserver.prototype.call = function () {
        var callbacks = this.callbacks, i = callbacks.length, changeRecords = this.changeRecords, oldCollection = this.oldCollection, records;
        this.queued = false;
        this.changeRecords = [];
        this.oldCollection = null;
        if (i) {
            if (oldCollection) {
                // TODO (martingust) we might want to refactor this to a common, independent of collection type, way of getting the records
                if (this.collection instanceof Map) {
                    records = map_change_records_1.getChangeRecords(oldCollection);
                }
                else {
                    //we might need to combine this with existing change records....
                    records = array_change_records_1.calcSplices(this.collection, 0, this.collection.length, oldCollection, 0, oldCollection.length);
                }
            }
            else {
                if (this.collection instanceof Map) {
                    records = changeRecords;
                }
                else {
                    records = array_change_records_1.projectArraySplices(this.collection, changeRecords);
                }
            }
            while (i--) {
                callbacks[i](records);
            }
        }
        if (this.lengthObserver) {
            this.lengthObserver.call(this.collection[this.lengthPropertyName]);
        }
    };
    return ModifyCollectionObserver;
})();
exports.ModifyCollectionObserver = ModifyCollectionObserver;
var CollectionLengthObserver = (function () {
    function CollectionLengthObserver(collection) {
        this.collection = collection;
        this.callbacks = [];
        this.lengthPropertyName = collection instanceof Map ? 'size' : 'length';
        this.currentValue = collection[this.lengthPropertyName];
    }
    CollectionLengthObserver.prototype.getValue = function () {
        return this.collection[this.lengthPropertyName];
    };
    CollectionLengthObserver.prototype.setValue = function (newValue) {
        this.collection[this.lengthPropertyName] = newValue;
    };
    CollectionLengthObserver.prototype.subscribe = function (callback) {
        var callbacks = this.callbacks;
        callbacks.push(callback);
        return function () {
            callbacks.splice(callbacks.indexOf(callback), 1);
        };
    };
    CollectionLengthObserver.prototype.call = function (newValue) {
        var callbacks = this.callbacks, i = callbacks.length, oldValue = this.currentValue;
        while (i--) {
            callbacks[i](newValue, oldValue);
        }
        this.currentValue = newValue;
    };
    return CollectionLengthObserver;
})();
exports.CollectionLengthObserver = CollectionLengthObserver;

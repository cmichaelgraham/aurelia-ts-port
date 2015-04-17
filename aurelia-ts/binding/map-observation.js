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
define(["require", "exports", './collection-observation'], function (require, exports, collection_observation_1) {
    var mapProto = Map.prototype;
    function getMapObserver(taskQueue, map) {
        return ModifyMapObserver.create(taskQueue, map);
    }
    exports.getMapObserver = getMapObserver;
    var ModifyMapObserver = (function (_super) {
        __extends(ModifyMapObserver, _super);
        function ModifyMapObserver(taskQueue, map) {
            _super.call(this, taskQueue, map);
        }
        ModifyMapObserver.create = function (taskQueue, map) {
            var observer = new ModifyMapObserver(taskQueue, map);
            map['set'] = function () {
                var oldValue = map.get(arguments[0]);
                var type = oldValue ? 'update' : 'add';
                var methodCallResult = mapProto['set'].apply(map, arguments);
                observer.addChangeRecord({
                    type: type,
                    object: map,
                    key: arguments[0],
                    oldValue: oldValue
                });
                return methodCallResult;
            };
            map['delete'] = function () {
                var oldValue = map.get(arguments[0]);
                var methodCallResult = mapProto['delete'].apply(map, arguments);
                observer.addChangeRecord({
                    type: 'delete',
                    object: map,
                    key: arguments[0],
                    oldValue: oldValue
                });
                return methodCallResult;
            };
            map['clear'] = function () {
                var methodCallResult = mapProto['clear'].apply(map, arguments);
                observer.addChangeRecord({
                    type: 'clear',
                    object: map
                });
                return methodCallResult;
            };
            return observer;
        };
        return ModifyMapObserver;
    })(collection_observation_1.ModifyCollectionObserver);
});

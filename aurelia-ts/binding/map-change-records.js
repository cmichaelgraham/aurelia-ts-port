define(["require", "exports"], function (require, exports) {
    function newRecord(type, object, key, oldValue) {
        return {
            type: type,
            object: object,
            key: key,
            oldValue: oldValue
        };
    }
    function getChangeRecords(map) {
        var entries = [];
        for (var _i = 0, _a = map.keys(); _i < _a.length; _i++) {
            var key = _a[_i];
            entries.push(newRecord('added', map, key));
        }
        return entries;
    }
    exports.getChangeRecords = getChangeRecords;
});

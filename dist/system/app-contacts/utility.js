System.register([], function(exports_1) {
    function areEqual(obj1, obj2) {
        return Object.keys(obj1).every(function (key) { return obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]); });
    }
    exports_1("areEqual", areEqual);
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});

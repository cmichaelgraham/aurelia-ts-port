System.register([], function(exports_1) {
    var Utilities;
    return {
        setters:[],
        execute: function() {
            Utilities = (function () {
                function Utilities() {
                }
                Utilities.getValue = function (val) {
                    if (val !== undefined && typeof (val) === 'function') {
                        return val();
                    }
                    return val;
                };
                Utilities.isEmptyValue = function (val) {
                    if (val === undefined) {
                        return true;
                    }
                    if (val === null) {
                        return true;
                    }
                    if (val === "") {
                        return true;
                    }
                    if (typeof (val) === 'string') {
                        if (String.prototype.trim) {
                            val = val.trim();
                        }
                        else {
                            val = val.replace(/^\s+|\s+$/g, '');
                        }
                    }
                    if (val.length !== undefined) {
                        return 0 === val.length;
                    }
                    return false;
                };
                return Utilities;
            })();
            exports_1("Utilities", Utilities);
            ;
        }
    }
});

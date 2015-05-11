var Debouncer = (function () {
    function Debouncer(debounceTimeout) {
        this.currentFunction = null;
        this.debounceTimeout = debounceTimeout;
    }
    Debouncer.prototype.debounce = function (func) {
        var _this = this;
        this.currentFunction = func;
        setTimeout(function () {
            if (func !== null && func !== undefined) {
                if (func === _this.currentFunction) {
                    _this.currentFunction = null;
                    func();
                }
            }
        }, this.debounceTimeout);
    };
    return Debouncer;
})();
exports.Debouncer = Debouncer;

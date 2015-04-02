define(["require", "exports"], function (require, exports) {
    var ConsoleAppender = (function () {
        function ConsoleAppender() {
        }
        ConsoleAppender.prototype.debug = function (logger, message) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            console.debug.apply(console, ["DEBUG [" + logger.id + "] " + message].concat(rest));
        };
        ConsoleAppender.prototype.info = function (logger, message) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            console.info.apply(console, ["INFO [" + logger.id + "] " + message].concat(rest));
        };
        ConsoleAppender.prototype.warn = function (logger, message) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            console.warn.apply(console, ["WARN [" + logger.id + "] " + message].concat(rest));
        };
        ConsoleAppender.prototype.error = function (logger, message) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            console.error.apply(console, ["ERROR [" + logger.id + "] " + message].concat(rest));
        };
        return ConsoleAppender;
    })();
    exports.ConsoleAppender = ConsoleAppender;
});

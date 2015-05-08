var specials = [
    '/', '.', '*', '+', '?', '|',
    '(', ')', '[', ']', '{', '}', '\\'
];
var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
// A Segment represents a segment in the original route description.
// Each Segment type provides an `eachChar` and `regex` method.
//
// The `eachChar` method invokes the callback with one or more character
// specifications. A character specification consumes one or more input
// characters.
//
// The `regex` method returns a regex fragment for the segment. If the
// segment is a dynamic or star segment, the regex fragment also includes
// a capture.
//
// A character specification contains:
//
// * `validChars`: a String with a list of all valid characters, or
// * `invalidChars`: a String with a list of all invalid characters
// * `repeat`: true if the character specification can repeat
var StaticSegment = (function () {
    function StaticSegment(string) {
        this.string = string;
    }
    StaticSegment.prototype.eachChar = function (callback) {
        for (var _i = 0, _a = this.string; _i < _a.length; _i++) {
            var ch = _a[_i];
            callback({ validChars: ch });
        }
    };
    StaticSegment.prototype.regex = function () {
        return this.string.replace(escapeRegex, '\\$1');
    };
    StaticSegment.prototype.generate = function () {
        return this.string;
    };
    return StaticSegment;
})();
exports.StaticSegment = StaticSegment;
var DynamicSegment = (function () {
    function DynamicSegment(name) {
        this.name = name;
    }
    DynamicSegment.prototype.eachChar = function (callback) {
        callback({ invalidChars: '/', repeat: true });
    };
    DynamicSegment.prototype.regex = function () {
        return '([^/]+)';
    };
    DynamicSegment.prototype.generate = function (params, consumed) {
        consumed[this.name] = true;
        return params[this.name];
    };
    return DynamicSegment;
})();
exports.DynamicSegment = DynamicSegment;
var StarSegment = (function () {
    function StarSegment(name) {
        this.name = name;
    }
    StarSegment.prototype.eachChar = function (callback) {
        callback({ invalidChars: '', repeat: true });
    };
    StarSegment.prototype.regex = function () {
        return '(.+)';
    };
    StarSegment.prototype.generate = function (params, consumed) {
        consumed[this.name] = true;
        return params[this.name];
    };
    return StarSegment;
})();
exports.StarSegment = StarSegment;
var EpsilonSegment = (function () {
    function EpsilonSegment() {
    }
    EpsilonSegment.prototype.eachChar = function () { };
    EpsilonSegment.prototype.regex = function () { return ''; };
    EpsilonSegment.prototype.generate = function () { return ''; };
    return EpsilonSegment;
})();
exports.EpsilonSegment = EpsilonSegment;

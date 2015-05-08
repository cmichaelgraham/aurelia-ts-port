// A State has a character specification and (`charSpec`) and a list of possible
// subsequent states (`nextStates`).
//
// If a State is an accepting state, it will also have several additional
// properties:
//
// * `regex`: A regular expression that is used to extract parameters from paths
//   that reached this accepting state.
// * `handlers`: Information on how to convert the list of captures into calls
//   to registered handlers with the specified parameters.
// * `types`: How many static, dynamic, or star segments in this route. Used to
//   decide which route to use if multiple registered routes match a path.
//
// Currently, State is implemented naively by looping over `nextStates` and
// comparing a character specification against a character. A more efficient
// implementation would use a hash of keys pointing at one or more next states.
var State = (function () {
    function State(charSpec) {
        this.charSpec = charSpec;
        this.nextStates = [];
    }
    State.prototype.get = function (charSpec) {
        for (var _i = 0, _a = this.nextStates; _i < _a.length; _i++) {
            var child = _a[_i];
            var isEqual = child.charSpec.validChars === charSpec.validChars &&
                child.charSpec.invalidChars === charSpec.invalidChars;
            if (isEqual) {
                return child;
            }
        }
    };
    State.prototype.put = function (charSpec) {
        var state = this.get(charSpec);
        // If the character specification already exists in a child of the current
        // state, just return that state.
        if (state) {
            return state;
        }
        // Make a new state for the character spec
        state = new State(charSpec);
        // Insert the new state as a child of the current state
        this.nextStates.push(state);
        // If this character specification repeats, insert the new state as a child
        // of itself. Note that this will not trigger an infinite loop because each
        // transition during recognition consumes a character.
        if (charSpec.repeat) {
            state.nextStates.push(state);
        }
        // Return the new state
        return state;
    };
    // Find a list of child states matching the next character
    State.prototype.match = function (ch) {
        var nextStates = this.nextStates, results = [], child, charSpec, chars;
        for (var i = 0, l = nextStates.length; i < l; i++) {
            child = nextStates[i];
            charSpec = child.charSpec;
            if (typeof (chars = charSpec.validChars) !== 'undefined') {
                if (chars.indexOf(ch) !== -1) {
                    results.push(child);
                }
            }
            else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
                if (chars.indexOf(ch) === -1) {
                    results.push(child);
                }
            }
        }
        return results;
    };
    return State;
})();
exports.State = State;
;

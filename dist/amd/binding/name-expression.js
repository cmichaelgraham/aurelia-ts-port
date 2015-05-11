define(["require", "exports"], function (require, exports) {
    var NameExpression = (function () {
        function NameExpression(name, mode) {
            this.property = name;
            this.discrete = true;
            this.mode = mode.replace(/-([a-z])/g, function (m, w) { return w.toUpperCase(); });
        }
        NameExpression.prototype.createBinding = function (target) {
            return new NameBinder(this.property, target, this.mode);
        };
        return NameExpression;
    })();
    exports.NameExpression = NameExpression;
    var NameBinder = (function () {
        function NameBinder(property, target, mode) {
            this.property = property;
            if (mode === 'element') {
                this.target = target;
            }
            else {
                this.target = target[mode];
                if (this.target === undefined) {
                    throw new Error("Attempted to reference \"" + mode + "\", but it was not found on the target element.");
                }
                else {
                    this.target = this.target.executionContext || this.target;
                }
            }
        }
        NameBinder.prototype.bind = function (source) {
            if (this.source) {
                if (this.source === source) {
                    return;
                }
                this.unbind();
            }
            this.source = source;
            source[this.property] = this.target;
        };
        NameBinder.prototype.unbind = function () {
            this.source[this.property] = null;
        };
        return NameBinder;
    })();
});

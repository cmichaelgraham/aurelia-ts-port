var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports"], function (require, exports) {
    var DecoratorApplicator = (function () {
        function DecoratorApplicator() {
            this._first = null;
            this._second = null;
            this._third = null;
            this._rest = null;
        }
        DecoratorApplicator.prototype.decorator = function (decorator) {
            if (this._first === null) {
                this._first = decorator;
                return this;
            }
            if (this._second === null) {
                this._second = decorator;
                return this;
            }
            if (this._third === null) {
                this._third = decorator;
                return this;
            }
            if (this._rest === null) {
                this._rest = [];
            }
            this._rest.push(decorator);
            return this;
        };
        DecoratorApplicator.prototype._decorate = function (target) {
            var i, ii, rest;
            if (this._first !== null) {
                this._first(target);
            }
            if (this._second !== null) {
                this._second(target);
            }
            if (this._third !== null) {
                this._third(target);
            }
            rest = this._rest;
            if (rest !== null) {
                for (i = 0, ii = rest.length; i < ii; ++i) {
                    rest[i](target);
                }
            }
        };
        return DecoratorApplicator;
    })();
    exports.DecoratorApplicator = DecoratorApplicator;
});

define(["require", "exports", './metadata'], function (require, exports, _metadata) {
    var DecoratorApplicator = (function () {
        function DecoratorApplicator() {
            this._first = null;
            this._second = null;
            this._third = null;
            this._rest = null;
        }
        DecoratorApplicator.prototype.metadata = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i - 0] = arguments[_i];
            }
            return this.decorator(function (target) {
                var meta = _metadata.Metadata.on(target);
                for (var i = 0, ii = rest.length; i < ii; ++i) {
                    meta.add(rest[i]);
                }
            });
        };
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

var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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

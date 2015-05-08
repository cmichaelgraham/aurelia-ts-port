System.register([], function(exports_1) {
    var DecoratorApplicator;
    return {
        setters:[],
        execute: function() {
            DecoratorApplicator = (function () {
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
            exports_1("DecoratorApplicator", DecoratorApplicator);
        }
    }
});

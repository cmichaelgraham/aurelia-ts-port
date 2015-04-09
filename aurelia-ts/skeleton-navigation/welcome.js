var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports"], function (require, exports) {
    var Welcome = (function () {
        function Welcome() {
            this.heading = 'Welcome to the Aurelia Navigation App!';
            this.firstName = 'John';
            this.lastName = 'Doe';
        }
        Object.defineProperty(Welcome.prototype, "fullName", {
            //Getters can't be observed with Object.observe, so they must be dirty checked.
            //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
            //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
            //@computedFrom('firstName', 'lastName')
            get: function () {
                return this.firstName + " " + this.lastName;
            },
            enumerable: true,
            configurable: true
        });
        Welcome.prototype.welcome = function () {
            alert("Welcome, " + this.fullName + "!");
        };
        return Welcome;
    })();
    exports.Welcome = Welcome;
    var UpperValueConverter = (function () {
        function UpperValueConverter() {
        }
        UpperValueConverter.prototype.toView = function (value) {
            return value && value.toUpperCase();
        };
        return UpperValueConverter;
    })();
    exports.UpperValueConverter = UpperValueConverter;
});

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
    var ValidationResult = (function () {
        function ValidationResult() {
            this.isValid = true;
            this.properties = {};
        }
        ValidationResult.prototype.addProperty = function (name) {
            if (!this.properties[name]) {
                this.properties[name] = new ValidationResultProperty(this);
            }
            return this.properties[name];
        };
        ValidationResult.prototype.checkValidity = function () {
            for (var propertyName in this.properties) {
                if (!this.properties[propertyName].isValid) {
                    this.isValid = false;
                    return;
                }
            }
            this.isValid = true;
        };
        return ValidationResult;
    })();
    exports.ValidationResult = ValidationResult;
    var ValidationResultProperty = (function () {
        function ValidationResultProperty(group) {
            this.group = group;
            this.isValid = true;
            this.isDirty = false;
            this.message = null;
            this.failingRule = null;
            this.onValidateCallbacks = [];
        }
        ValidationResultProperty.prototype.onValidate = function (onValidateCallback) {
            this.onValidateCallbacks.push(onValidateCallback);
        };
        ValidationResultProperty.prototype.setValidity = function (validationResponse, shouldBeDirty) {
            var notifyObservers = (!this.isDirty && shouldBeDirty)
                || (this.isValid !== validationResponse.isValid)
                || (this.message !== validationResponse.message);
            if (shouldBeDirty)
                this.isDirty = true;
            this.message = validationResponse.message;
            this.failingRule = validationResponse.failingRule;
            this.isValid = validationResponse.isValid; //Set isValid last in case someone has observed 'isValid'
            if (this.isValid !== this.group.isValid)
                this.group.checkValidity();
            if (notifyObservers) {
                for (var i = 0; i < this.onValidateCallbacks.length; i++) {
                    var callback = this.onValidateCallbacks[i];
                    callback(this);
                }
            }
        };
        return ValidationResultProperty;
    })();
    exports.ValidationResultProperty = ValidationResultProperty;
});

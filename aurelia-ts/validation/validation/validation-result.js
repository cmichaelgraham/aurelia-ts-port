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
            var notifyObservers = (!this.isDirty && shouldBeDirty) || (this.isValid !== validationResponse.isValid) || (this.message !== validationResponse.message);
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

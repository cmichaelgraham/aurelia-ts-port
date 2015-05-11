define(["require", "exports"], function (require, exports) {
    var ValidationMetadata = (function () {
        function ValidationMetadata() {
            this.properties = [];
        }
        ValidationMetadata.prototype.getOrCreateProperty = function (propertyName) {
            var property = this.properties.find(function (x) { return x.propertyName === propertyName; });
            if (property === undefined) {
                property = new ValidationPropertyMetadata(propertyName);
                this.properties.push(property);
            }
            return property;
        };
        ValidationMetadata.prototype.setup = function (validation) {
            this.properties.forEach(function (property) {
                property.setup(validation);
            });
        };
        return ValidationMetadata;
    })();
    var ValidationPropertyMetadata = (function () {
        function ValidationPropertyMetadata(propertyName) {
            this.propertyName = propertyName;
            this.setupSteps = [];
        }
        ValidationPropertyMetadata.prototype.addSetupStep = function (setupStep) {
            this.setupSteps.push(setupStep);
        };
        ValidationPropertyMetadata.prototype.setup = function (validation) {
            validation.ensure(this.propertyName);
            this.setupSteps.forEach(function (setupStep) {
                setupStep(validation);
            });
        };
        return ValidationPropertyMetadata;
    })();
    function ensure(setupStep) {
        return function (target, propertyName) {
            if (target._validationMetadata === undefined) {
                target._validationMetadata = new ValidationMetadata();
            }
            var property = target._validationMetadata.getOrCreateProperty(propertyName);
            property.addSetupStep(setupStep);
        };
    }
    exports.ensure = ensure;
});

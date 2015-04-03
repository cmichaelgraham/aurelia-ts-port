define(["require", "exports"], function (require, exports) {
    var ValidateAttachedBehaviorConfig = (function () {
        function ValidateAttachedBehaviorConfig() {
            this.bindingPathAttributes = [
                'validate',
                'value.bind',
                'value.two-way'
            ];
            this.appendMessageToLabel = true;
            this.appendMessageToInput = false;
        }
        return ValidateAttachedBehaviorConfig;
    })();
    exports.ValidateAttachedBehaviorConfig = ValidateAttachedBehaviorConfig;
});

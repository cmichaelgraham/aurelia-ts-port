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
define(["require", "exports", '../dependency-injection/index', '../templating/index'], function (require, exports, index_1, index_2) {
    var With = (function () {
        function With(viewFactory, viewSlot) {
            this.viewFactory = viewFactory;
            this.viewSlot = viewSlot;
        }
        With.prototype.valueChanged = function (newValue) {
            if (!this.view) {
                this.view = this.viewFactory.create(newValue);
                this.viewSlot.add(this.view);
            }
            else {
                this.view.bind(newValue);
            }
        };
        With = __decorate([index_2.customAttribute('with'), index_2.templateController, index_1.inject(index_2.BoundViewFactory, index_2.ViewSlot)], With);
        return With;
    })();
    exports.With = With;
});

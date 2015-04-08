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
define(["require", "exports", '../templating/index', '../dependency-injection/index'], function (require, exports, index_1, index_2) {
    var If = (function () {
        function If(viewFactory, viewSlot) {
            this.viewFactory = viewFactory;
            this.viewSlot = viewSlot;
            this.showing = false;
        }
        If.prototype.valueChanged = function (newValue) {
            if (!newValue) {
                if (this.view) {
                    this.viewSlot.remove(this.view);
                    this.view.unbind();
                }
                this.showing = false;
                return;
            }
            if (!this.view) {
                this.view = this.viewFactory.create();
            }
            if (!this.showing) {
                this.showing = true;
                if (!this.view.bound) {
                    this.view.bind();
                }
                this.viewSlot.add(this.view);
            }
        };
        If = __decorate([index_1.customAttribute('if'), index_1.templateController, index_2.inject(index_1.BoundViewFactory, index_1.ViewSlot)], If);
        return If;
    })();
    exports.If = If;
});

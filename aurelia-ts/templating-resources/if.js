var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
        If = __decorate([
            index_1.customAttribute('if'),
            index_1.templateController,
            index_2.inject(index_1.BoundViewFactory, index_1.ViewSlot)
        ], If);
        return If;
    })();
    exports.If = If;
});

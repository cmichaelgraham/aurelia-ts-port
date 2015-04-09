var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
        With = __decorate([
            index_2.customAttribute('with'),
            index_2.templateController,
            index_1.inject(index_2.BoundViewFactory, index_2.ViewSlot)
        ], With);
        return With;
    })();
    exports.With = With;
});

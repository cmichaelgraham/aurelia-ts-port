define(["require", "exports", '../templating/index'], function (require, exports, _index) {
    var If = (function () {
        function If(viewFactory, viewSlot) {
            this.viewFactory = viewFactory;
            this.viewSlot = viewSlot;
            this.showing = false;
        }
        If.metadata = function () {
            return _index.Behavior.templateController('if').withProperty('value', 'valueChanged', 'if');
        };
        If.inject = function () {
            return [
                _index.BoundViewFactory,
                _index.ViewSlot
            ];
        };
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
        return If;
    })();
    exports.If = If;
});

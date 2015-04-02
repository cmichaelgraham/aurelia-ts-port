define(["require", "exports", '../templating/index'], function (require, exports, _index) {
    var With = (function () {
        function With(viewFactory, viewSlot) {
            this.viewFactory = viewFactory;
            this.viewSlot = viewSlot;
        }
        With.metadata = function () {
            return _index.Behavior.templateController('with').withProperty('value', 'valueChanged', 'with');
        };
        With.inject = function () {
            return [
                _index.BoundViewFactory,
                _index.ViewSlot
            ];
        };
        With.prototype.valueChanged = function (newValue) {
            if (!this.view) {
                this.view = this.viewFactory.create(newValue);
                this.viewSlot.add(this.view);
            }
            else {
                this.view.bind(newValue);
            }
        };
        return With;
    })();
    exports.With = With;
});

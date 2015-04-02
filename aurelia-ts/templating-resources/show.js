define(["require", "exports", '../templating/index'], function (require, exports, _index) {
    function addStyleString(str) {
        var node = document.createElement('style');
        node.innerHTML = str;
        node.type = 'text/css';
        document.head.appendChild(node);
    }
    addStyleString('.aurelia-hide { display:none !important; }');
    var Show = (function () {
        function Show(element) {
            this.element = element;
        }
        Show.metadata = function () {
            return _index.Behavior.attachedBehavior('show').withProperty('value', 'valueChanged', 'show');
        };
        Show.inject = function () {
            return [
                Element
            ];
        };
        Show.prototype.valueChanged = function (newValue) {
            if (newValue) {
                this.element.classList.remove('aurelia-hide');
            }
            else {
                this.element.classList.add('aurelia-hide');
            }
        };
        return Show;
    })();
    exports.Show = Show;
});

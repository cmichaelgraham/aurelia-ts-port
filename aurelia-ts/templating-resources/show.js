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
        Show.prototype.valueChanged = function (newValue) {
            if (newValue) {
                this.element.classList.remove('aurelia-hide');
            }
            else {
                this.element.classList.add('aurelia-hide');
            }
        };
        Show = __decorate([index_2.customAttribute('show'), index_1.inject(Element)], Show);
        return Show;
    })();
    exports.Show = Show;
});

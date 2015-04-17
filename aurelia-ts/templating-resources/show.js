var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-templating'], function (require, exports, aurelia_dependency_injection_1, aurelia_templating_1) {
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
        Show = __decorate([
            aurelia_templating_1.customAttribute('show'),
            aurelia_dependency_injection_1.inject(Element)
        ], Show);
        return Show;
    })();
    exports.Show = Show;
});

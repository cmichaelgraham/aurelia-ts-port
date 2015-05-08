System.register([], function(exports_1) {
    var NameExpression, NameBinder;
    return {
        setters:[],
        execute: function() {
            NameExpression = (function () {
                function NameExpression(name, mode) {
                    this.property = name;
                    this.discrete = true;
                    this.mode = (mode || 'view-model').toLowerCase();
                }
                NameExpression.prototype.createBinding = function (target) {
                    return new NameBinder(this.property, target, this.mode);
                };
                return NameExpression;
            })();
            exports_1("NameExpression", NameExpression);
            NameBinder = (function () {
                function NameBinder(property, target, mode) {
                    this.property = property;
                    switch (mode) {
                        case 'element':
                            this.target = target;
                            break;
                        case 'view-model':
                            this.target = target.primaryBehavior ? target.primaryBehavior.executionContext : target;
                            break;
                        default:
                            throw new Error('Name expressions do not support mode: ' + mode);
                    }
                }
                NameBinder.prototype.bind = function (source) {
                    if (this.source) {
                        if (this.source === source) {
                            return;
                        }
                        this.unbind();
                    }
                    this.source = source;
                    source[this.property] = this.target;
                };
                NameBinder.prototype.unbind = function () {
                    this.source[this.property] = null;
                };
                return NameBinder;
            })();
        }
    }
});

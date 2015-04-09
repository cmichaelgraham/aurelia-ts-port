var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", './path-observer', './composite-observer'], function (require, exports, path_observer_1, composite_observer_1) {
    var Expression = (function () {
        function Expression() {
            this.isChain = false;
            this.isAssignable = false;
        }
        Expression.prototype.evaluate = function () {
            throw new Error("Cannot evaluate " + this);
        };
        Expression.prototype.assign = function () {
            throw new Error("Cannot assign to " + this);
        };
        Expression.prototype.toString = function () {
            return Unparser.unparse(this);
        };
        return Expression;
    })();
    exports.Expression = Expression;
    var Chain = (function (_super) {
        __extends(Chain, _super);
        function Chain(expressions) {
            _super.call(this);
            this.expressions = expressions;
            this.isChain = true;
        }
        Chain.prototype.evaluate = function (scope, valueConverters) {
            var result, expressions = this.expressions, length = expressions.length, i, last;
            for (i = 0; i < length; ++i) {
                last = expressions[i].evaluate(scope, valueConverters);
                if (last !== null) {
                    result = last;
                }
            }
            return result;
        };
        Chain.prototype.accept = function (visitor) {
            visitor.visitChain(this);
        };
        return Chain;
    })(Expression);
    exports.Chain = Chain;
    var ValueConverter = (function (_super) {
        __extends(ValueConverter, _super);
        function ValueConverter(expression, name, args, allArgs) {
            _super.call(this);
            this.expression = expression;
            this.name = name;
            this.args = args;
            this.allArgs = allArgs;
        }
        ValueConverter.prototype.evaluate = function (scope, valueConverters) {
            var converter = valueConverters(this.name);
            if (!converter) {
                throw new Error("No ValueConverter named \"" + this.name + "\" was found!");
            }
            if ('toView' in converter) {
                return converter.toView.apply(converter, evalList(scope, this.allArgs, valueConverters));
            }
            return this.allArgs[0].evaluate(scope, valueConverters);
        };
        ValueConverter.prototype.assign = function (scope, value, valueConverters) {
            var converter = valueConverters(this.name);
            if (!converter) {
                throw new Error("No ValueConverter named \"" + this.name + "\" was found!");
            }
            if ('fromView' in converter) {
                value = converter.fromView.apply(converter, [value].concat(evalList(scope, this.args, valueConverters)));
            }
            return this.allArgs[0].assign(scope, value, valueConverters);
        };
        ValueConverter.prototype.accept = function (visitor) {
            visitor.visitValueConverter(this);
        };
        ValueConverter.prototype.connect = function (binding, scope) {
            var _this = this;
            var observer, childObservers = [], i, ii, exp, expInfo;
            for (i = 0, ii = this.allArgs.length; i < ii; ++i) {
                exp = this.allArgs[i];
                expInfo = exp.connect(binding, scope);
                if (expInfo.observer) {
                    childObservers.push(expInfo.observer);
                }
            }
            if (childObservers.length) {
                observer = new composite_observer_1.CompositeObserver(childObservers, function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: this.evaluate(scope, binding.valueConverterLookupFunction),
                observer: observer
            };
        };
        return ValueConverter;
    })(Expression);
    exports.ValueConverter = ValueConverter;
    var Assign = (function (_super) {
        __extends(Assign, _super);
        function Assign(target, value) {
            _super.call(this);
            this.target = target;
            this.value = value;
        }
        Assign.prototype.evaluate = function (scope, valueConverters) {
            return this.target.assign(scope, this.value.evaluate(scope, valueConverters));
        };
        Assign.prototype.accept = function (vistor) {
            vistor.visitAssign(this);
        };
        Assign.prototype.connect = function (binding, scope) {
            return { value: this.evaluate(scope, binding.valueConverterLookupFunction) };
        };
        return Assign;
    })(Expression);
    exports.Assign = Assign;
    var Conditional = (function (_super) {
        __extends(Conditional, _super);
        function Conditional(condition, yes, no) {
            _super.call(this);
            this.condition = condition;
            this.yes = yes;
            this.no = no;
        }
        Conditional.prototype.evaluate = function (scope, valueConverters) {
            return (!!this.condition.evaluate(scope)) ? this.yes.evaluate(scope) : this.no.evaluate(scope);
        };
        Conditional.prototype.accept = function (visitor) {
            visitor.visitConditional(this);
        };
        Conditional.prototype.connect = function (binding, scope) {
            var _this = this;
            var conditionInfo = this.condition.connect(binding, scope), yesInfo = this.yes.connect(binding, scope), noInfo = this.no.connect(binding, scope), childObservers = [], observer;
            if (conditionInfo.observer) {
                childObservers.push(conditionInfo.observer);
            }
            if (yesInfo.observer) {
                childObservers.push(yesInfo.observer);
            }
            if (noInfo.observer) {
                childObservers.push(noInfo.observer);
            }
            if (childObservers.length) {
                observer = new composite_observer_1.CompositeObserver(childObservers, function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: (!!conditionInfo.value) ? yesInfo.value : noInfo.value,
                observer: observer
            };
        };
        return Conditional;
    })(Expression);
    exports.Conditional = Conditional;
    var AccessScope = (function (_super) {
        __extends(AccessScope, _super);
        function AccessScope(name) {
            _super.call(this);
            this.name = name;
            this.isAssignable = true;
        }
        AccessScope.prototype.evaluate = function (scope, valueConverters) {
            return scope[this.name];
        };
        AccessScope.prototype.assign = function (scope, value) {
            return scope[this.name] = value;
        };
        AccessScope.prototype.accept = function (visitor) {
            visitor.visitAccessScope(this);
        };
        AccessScope.prototype.connect = function (binding, scope) {
            var observer = binding.getObserver(scope, this.name);
            return {
                value: observer.getValue(),
                observer: observer
            };
        };
        return AccessScope;
    })(Expression);
    exports.AccessScope = AccessScope;
    var AccessMember = (function (_super) {
        __extends(AccessMember, _super);
        function AccessMember(object, name) {
            _super.call(this);
            this.object = object;
            this.name = name;
            this.isAssignable = true;
        }
        AccessMember.prototype.evaluate = function (scope, valueConverters) {
            var instance = this.object.evaluate(scope, valueConverters);
            return instance === null || instance === undefined
                ? instance
                : instance[this.name];
        };
        AccessMember.prototype.assign = function (scope, value) {
            var instance = this.object.evaluate(scope);
            if (instance === null || instance === undefined) {
                instance = {};
                this.object.assign(scope, instance);
            }
            return instance[this.name] = value;
        };
        AccessMember.prototype.accept = function (visitor) {
            visitor.visitAccessMember(this);
        };
        AccessMember.prototype.connect = function (binding, scope) {
            var _this = this;
            var info = this.object.connect(binding, scope), objectInstance = info.value, objectObserver = info.observer, observer;
            if (objectObserver) {
                observer = new path_observer_1.PathObserver(objectObserver, function (value) {
                    if (value == null || value == undefined) {
                        return value;
                    }
                    return binding.getObserver(value, _this.name);
                }, objectInstance);
            }
            else {
                observer = binding.getObserver(objectInstance, this.name);
            }
            return {
                value: objectInstance == null ? null : objectInstance[this.name],
                observer: observer
            };
        };
        return AccessMember;
    })(Expression);
    exports.AccessMember = AccessMember;
    var AccessKeyed = (function (_super) {
        __extends(AccessKeyed, _super);
        function AccessKeyed(object, key) {
            _super.call(this);
            this.object = object;
            this.key = key;
            this.isAssignable = true;
        }
        AccessKeyed.prototype.evaluate = function (scope, valueConverters) {
            var instance = this.object.evaluate(scope, valueConverters);
            var lookup = this.key.evaluate(scope, valueConverters);
            return getKeyed(instance, lookup);
        };
        AccessKeyed.prototype.assign = function (scope, value) {
            var instance = this.object.evaluate(scope);
            var lookup = this.key.evaluate(scope);
            return setKeyed(instance, lookup, value);
        };
        AccessKeyed.prototype.accept = function (visitor) {
            visitor.visitAccessKeyed(this);
        };
        AccessKeyed.prototype.connect = function (binding, scope) {
            var _this = this;
            var objectInfo = this.object.connect(binding, scope), keyInfo = this.key.connect(binding, scope), childObservers = [], observer;
            if (objectInfo.observer) {
                childObservers.push(objectInfo.observer);
            }
            if (keyInfo.observer) {
                childObservers.push(keyInfo.observer);
            }
            if (childObservers.length) {
                observer = new composite_observer_1.CompositeObserver(childObservers, function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: this.evaluate(scope, binding.valueConverterLookupFunction),
                observer: observer
            };
        };
        return AccessKeyed;
    })(Expression);
    exports.AccessKeyed = AccessKeyed;
    var CallScope = (function (_super) {
        __extends(CallScope, _super);
        function CallScope(name, args) {
            _super.call(this);
            this.name = name;
            this.args = args;
        }
        CallScope.prototype.evaluate = function (scope, valueConverters, args) {
            args = args || evalList(scope, this.args, valueConverters);
            return ensureFunctionFromMap(scope, this.name).apply(scope, args);
        };
        CallScope.prototype.accept = function (visitor) {
            visitor.visitCallScope(this);
        };
        CallScope.prototype.connect = function (binding, scope) {
            var _this = this;
            var observer, childObservers = [], i, ii, exp, expInfo;
            for (i = 0, ii = this.args.length; i < ii; ++i) {
                exp = this.args[i];
                expInfo = exp.connect(binding, scope);
                if (expInfo.observer) {
                    childObservers.push(expInfo.observer);
                }
            }
            if (childObservers.length) {
                observer = new composite_observer_1.CompositeObserver(childObservers, function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: this.evaluate(scope, binding.valueConverterLookupFunction),
                observer: observer
            };
        };
        return CallScope;
    })(Expression);
    exports.CallScope = CallScope;
    var CallMember = (function (_super) {
        __extends(CallMember, _super);
        function CallMember(object, name, args) {
            _super.call(this);
            this.object = object;
            this.name = name;
            this.args = args;
        }
        CallMember.prototype.evaluate = function (scope, valueConverters, args) {
            var instance = this.object.evaluate(scope, valueConverters);
            args = args || evalList(scope, this.args, valueConverters);
            return ensureFunctionFromMap(instance, this.name).apply(instance, args);
        };
        CallMember.prototype.accept = function (visitor) {
            visitor.visitCallMember(this);
        };
        CallMember.prototype.connect = function (binding, scope) {
            var _this = this;
            var observer, objectInfo = this.object.connect(binding, scope), childObservers = [], i, ii, exp, expInfo;
            if (objectInfo.observer) {
                childObservers.push(objectInfo.observer);
            }
            for (i = 0, ii = this.args.length; i < ii; ++i) {
                exp = this.args[i];
                expInfo = exp.connect(binding, scope);
                if (expInfo.observer) {
                    childObservers.push(expInfo.observer);
                }
            }
            if (childObservers.length) {
                observer = new composite_observer_1.CompositeObserver(childObservers, function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: this.evaluate(scope, binding.valueConverterLookupFunction),
                observer: observer
            };
        };
        return CallMember;
    })(Expression);
    exports.CallMember = CallMember;
    var CallFunction = (function (_super) {
        __extends(CallFunction, _super);
        function CallFunction(func, args) {
            _super.call(this);
            this.func = func;
            this.args = args;
        }
        CallFunction.prototype.evaluate = function (scope, valueConverters, args) {
            var func = this.func.evaluate(scope, valueConverters);
            if (typeof func !== 'function') {
                throw new Error(this.func + " is not a function");
            }
            else {
                return func.apply(null, args || evalList(scope, this.args, valueConverters));
            }
        };
        CallFunction.prototype.accept = function (visitor) {
            visitor.visitCallFunction(this);
        };
        CallFunction.prototype.connect = function (binding, scope) {
            var _this = this;
            var observer, funcInfo = this.func.connect(binding, scope), childObservers = [], i, ii, exp, expInfo;
            if (funcInfo.observer) {
                childObservers.push(funcInfo.observer);
            }
            for (i = 0, ii = this.args.length; i < ii; ++i) {
                exp = this.args[i];
                expInfo = exp.connect(binding, scope);
                if (expInfo.observer) {
                    childObservers.push(expInfo.observer);
                }
            }
            if (childObservers.length) {
                observer = new composite_observer_1.CompositeObserver(childObservers, function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: this.evaluate(scope, binding.valueConverterLookupFunction),
                observer: observer
            };
        };
        return CallFunction;
    })(Expression);
    exports.CallFunction = CallFunction;
    var Binary = (function (_super) {
        __extends(Binary, _super);
        function Binary(operation, left, right) {
            _super.call(this);
            this.operation = operation;
            this.left = left;
            this.right = right;
        }
        Binary.prototype.evaluate = function (scope, valueConverters) {
            var left = this.left.evaluate(scope);
            switch (this.operation) {
                case '&&': return !!left && !!this.right.evaluate(scope);
                case '||': return !!left || !!this.right.evaluate(scope);
            }
            var right = this.right.evaluate(scope);
            switch (this.operation) {
                case '==': return left == right;
                case '===': return left === right;
                case '!=': return left != right;
                case '!==': return left !== right;
            }
            // Null check for the operations.
            if (left === null || right === null) {
                switch (this.operation) {
                    case '+':
                        if (left != null)
                            return left;
                        if (right != null)
                            return right;
                        return 0;
                    case '-':
                        if (left != null)
                            return left;
                        if (right != null)
                            return 0 - right;
                        return 0;
                }
                return null;
            }
            switch (this.operation) {
                case '+': return autoConvertAdd(left, right);
                case '-': return left - right;
                case '*': return left * right;
                case '/': return left / right;
                case '%': return left % right;
                case '<': return left < right;
                case '>': return left > right;
                case '<=': return left <= right;
                case '>=': return left >= right;
                case '^': return left ^ right;
                case '&': return left & right;
            }
            throw new Error("Internal error [" + this.operation + "] not handled");
        };
        Binary.prototype.accept = function (visitor) {
            visitor.visitBinary(this);
        };
        Binary.prototype.connect = function (binding, scope) {
            var _this = this;
            var leftInfo = this.left.connect(binding, scope), rightInfo = this.right.connect(binding, scope), childObservers = [], observer;
            if (leftInfo.observer) {
                childObservers.push(leftInfo.observer);
            }
            if (rightInfo.observer) {
                childObservers.push(rightInfo.observer);
            }
            if (childObservers.length) {
                observer = new composite_observer_1.CompositeObserver(childObservers, function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: this.evaluate(scope, binding.valueConverterLookupFunction),
                observer: observer
            };
        };
        return Binary;
    })(Expression);
    exports.Binary = Binary;
    var PrefixNot = (function (_super) {
        __extends(PrefixNot, _super);
        function PrefixNot(operation, expression) {
            _super.call(this);
            this.operation = operation;
            this.expression = expression;
        }
        PrefixNot.prototype.evaluate = function (scope, valueConverters) {
            return !this.expression.evaluate(scope);
        };
        PrefixNot.prototype.accept = function (visitor) {
            visitor.visitPrefix(this);
        };
        PrefixNot.prototype.connect = function (binding, scope) {
            var _this = this;
            var info = this.expression.connect(binding, scope), observer;
            if (info.observer) {
                observer = new composite_observer_1.CompositeObserver([info.observer], function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: !info.value,
                observer: observer
            };
        };
        return PrefixNot;
    })(Expression);
    exports.PrefixNot = PrefixNot;
    var LiteralPrimitive = (function (_super) {
        __extends(LiteralPrimitive, _super);
        function LiteralPrimitive(value) {
            _super.call(this);
            this.value = value;
        }
        LiteralPrimitive.prototype.evaluate = function (scope, valueConverters) {
            return this.value;
        };
        LiteralPrimitive.prototype.accept = function (visitor) {
            visitor.visitLiteralPrimitive(this);
        };
        LiteralPrimitive.prototype.connect = function (binding, scope) {
            return { value: this.value };
        };
        return LiteralPrimitive;
    })(Expression);
    exports.LiteralPrimitive = LiteralPrimitive;
    var LiteralString = (function (_super) {
        __extends(LiteralString, _super);
        function LiteralString(value) {
            _super.call(this);
            this.value = value;
        }
        LiteralString.prototype.evaluate = function (scope, valueConverters) {
            return this.value;
        };
        LiteralString.prototype.accept = function (visitor) {
            visitor.visitLiteralString(this);
        };
        LiteralString.prototype.connect = function (binding, scope) {
            return { value: this.value };
        };
        return LiteralString;
    })(Expression);
    exports.LiteralString = LiteralString;
    var LiteralArray = (function (_super) {
        __extends(LiteralArray, _super);
        function LiteralArray(elements) {
            _super.call(this);
            this.elements = elements;
        }
        LiteralArray.prototype.evaluate = function (scope, valueConverters) {
            var elements = this.elements, length = elements.length, result = [], i;
            for (i = 0; i < length; ++i) {
                result[i] = elements[i].evaluate(scope, valueConverters);
            }
            return result;
        };
        LiteralArray.prototype.accept = function (visitor) {
            visitor.visitLiteralArray(this);
        };
        LiteralArray.prototype.connect = function (binding, scope) {
            var _this = this;
            var observer, childObservers = [], results = [], i, ii, exp, expInfo;
            for (i = 0, ii = this.elements.length; i < ii; ++i) {
                exp = this.elements[i];
                expInfo = exp.connect(binding, scope);
                if (expInfo.observer) {
                    childObservers.push(expInfo.observer);
                }
                results[i] = expInfo.value;
            }
            if (childObservers.length) {
                observer = new composite_observer_1.CompositeObserver(childObservers, function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: results,
                observer: observer
            };
        };
        return LiteralArray;
    })(Expression);
    exports.LiteralArray = LiteralArray;
    var LiteralObject = (function (_super) {
        __extends(LiteralObject, _super);
        function LiteralObject(keys, values) {
            _super.call(this);
            this.keys = keys;
            this.values = values;
        }
        LiteralObject.prototype.evaluate = function (scope, valueConverters) {
            var instance = {}, keys = this.keys, values = this.values, length = keys.length, i;
            for (i = 0; i < length; ++i) {
                instance[keys[i]] = values[i].evaluate(scope, valueConverters);
            }
            return instance;
        };
        LiteralObject.prototype.accept = function (visitor) {
            visitor.visitLiteralObject(this);
        };
        LiteralObject.prototype.connect = function (binding, scope) {
            var _this = this;
            var observer, childObservers = [], instance = {}, keys = this.keys, values = this.values, length = keys.length, i, valueInfo;
            for (i = 0; i < length; ++i) {
                valueInfo = values[i].connect(binding, scope);
                if (valueInfo.observer) {
                    childObservers.push(valueInfo.observer);
                }
                instance[keys[i]] = valueInfo.value;
            }
            if (childObservers.length) {
                observer = new composite_observer_1.CompositeObserver(childObservers, function () {
                    return _this.evaluate(scope, binding.valueConverterLookupFunction);
                });
            }
            return {
                value: instance,
                observer: observer
            };
        };
        return LiteralObject;
    })(Expression);
    exports.LiteralObject = LiteralObject;
    var Unparser = (function () {
        function Unparser(buffer) {
            this.buffer = buffer;
        }
        Unparser.unparse = function (expression) {
            var buffer = [], visitor = new Unparser(buffer);
            expression.accept(visitor);
            return buffer.join('');
        };
        Unparser.prototype.write = function (text) {
            this.buffer.push(text);
        };
        Unparser.prototype.writeArgs = function (args) {
            var i, length;
            this.write('(');
            for (i = 0, length = args.length; i < length; ++i) {
                if (i !== 0) {
                    this.write(',');
                }
                args[i].accept(this);
            }
            this.write(')');
        };
        Unparser.prototype.visitChain = function (chain) {
            var expressions = chain.expressions, length = expressions.length, i;
            for (i = 0; i < length; ++i) {
                if (i !== 0) {
                    this.write(';');
                }
                expressions[i].accept(this);
            }
        };
        Unparser.prototype.visitValueConverter = function (converter) {
            var args = converter.args, length = args.length, i;
            this.write('(');
            converter.expression.accept(this);
            this.write("|" + converter.name);
            for (i = 0; i < length; ++i) {
                this.write(' :');
                args[i].accept(this);
            }
            this.write(')');
        };
        Unparser.prototype.visitAssign = function (assign) {
            assign.target.accept(this);
            this.write('=');
            assign.value.accept(this);
        };
        Unparser.prototype.visitConditional = function (conditional) {
            conditional.condition.accept(this);
            this.write('?');
            conditional.yes.accept(this);
            this.write(':');
            conditional.no.accept(this);
        };
        Unparser.prototype.visitAccessScope = function (access) {
            this.write(access.name);
        };
        Unparser.prototype.visitAccessMember = function (access) {
            access.object.accept(this);
            this.write("." + access.name);
        };
        Unparser.prototype.visitAccessKeyed = function (access) {
            access.object.accept(this);
            this.write('[');
            access.key.accept(this);
            this.write(']');
        };
        Unparser.prototype.visitCallScope = function (call) {
            this.write(call.name);
            this.writeArgs(call.args);
        };
        Unparser.prototype.visitCallFunction = function (call) {
            call.func.accept(this);
            this.writeArgs(call.args);
        };
        Unparser.prototype.visitCallMember = function (call) {
            call.object.accept(this);
            this.write("." + call.name);
            this.writeArgs(call.args);
        };
        Unparser.prototype.visitPrefix = function (prefix) {
            this.write("(" + prefix.operation);
            prefix.expression.accept(this);
            this.write(')');
        };
        Unparser.prototype.visitBinary = function (binary) {
            this.write('(');
            binary.left.accept(this);
            this.write(binary.operation);
            binary.right.accept(this);
            this.write(')');
        };
        Unparser.prototype.visitLiteralPrimitive = function (literal) {
            this.write("" + literal.value);
        };
        Unparser.prototype.visitLiteralArray = function (literal) {
            var elements = literal.elements, length = elements.length, i;
            this.write('[');
            for (i = 0; i < length; ++i) {
                if (i !== 0) {
                    this.write(',');
                }
                elements[i].accept(this);
            }
            this.write(']');
        };
        Unparser.prototype.visitLiteralObject = function (literal) {
            var keys = literal.keys, values = literal.values, length = keys.length, i;
            this.write('{');
            for (i = 0; i < length; ++i) {
                if (i !== 0) {
                    this.write(',');
                }
                this.write("'" + keys[i] + "':");
                values[i].accept(this);
            }
            this.write('}');
        };
        Unparser.prototype.visitLiteralString = function (literal) {
            var escaped = literal.value.replace(/'/g, "\'");
            this.write("'" + escaped + "'");
        };
        return Unparser;
    })();
    exports.Unparser = Unparser;
    var evalListCache = [[], [0], [0, 0], [0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0, 0]];
    /// Evaluate the [list] in context of the [scope].
    function evalList(scope, list, valueConverters) {
        var length = list.length, cacheLength, i;
        for (cacheLength = evalListCache.length; cacheLength <= length; ++cacheLength) {
            evalListCache.push([]);
        }
        var result = evalListCache[length];
        for (i = 0; i < length; ++i) {
            result[i] = list[i].evaluate(scope, valueConverters);
        }
        return result;
    }
    /// Add the two arguments with automatic type conversion.
    function autoConvertAdd(a, b) {
        if (a != null && b != null) {
            // TODO(deboer): Support others.
            if (typeof a == 'string' && typeof b != 'string') {
                return a + b.toString();
            }
            if (typeof a != 'string' && typeof b == 'string') {
                return a.toString() + b;
            }
            return a + b;
        }
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return 0;
    }
    function ensureFunctionFromMap(obj, name) {
        var func = obj[name];
        if (typeof func === 'function') {
            return func;
        }
        if (func === null) {
            throw new Error("Undefined function " + name);
        }
        else {
            throw new Error(name + " is not a function");
        }
    }
    function getKeyed(obj, key) {
        if (Array.isArray(obj)) {
            return obj[parseInt(key)];
        }
        else if (obj) {
            return obj[key];
        }
        else if (obj === null) {
            throw new Error('Accessing null object');
        }
        else {
            return obj[key];
        }
    }
    function setKeyed(obj, key, value) {
        if (Array.isArray(obj)) {
            var index = parseInt(key);
            if (obj.length <= index) {
                obj.length = index + 1;
            }
            obj[index] = value;
        }
        else {
            obj[key] = value;
        }
        return value;
    }
});

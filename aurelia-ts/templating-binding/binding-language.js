var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../templating/index', '../binding/index', './syntax-interpreter', '../logging/index'], function (require, exports, _index, _index_1, _syntax_interpreter, LogManager) {
    var info = {}, logger = LogManager.getLogger('templating-binding');
    var TemplatingBindingLanguage = (function (_super) {
        __extends(TemplatingBindingLanguage, _super);
        function TemplatingBindingLanguage(parser, observerLocator, syntaxInterpreter) {
            this.parser = parser;
            this.observerLocator = observerLocator;
            this.syntaxInterpreter = syntaxInterpreter;
            this.emptyStringExpression = this.parser.parse('\'\'');
            syntaxInterpreter.language = this;
            this.attributeMap = syntaxInterpreter.attributeMap = {
                'class': 'className',
                'for': 'htmlFor',
                'tabindex': 'tabIndex',
                'textcontent': 'textContent',
                'innerhtml': 'innerHTML',
                // HTMLInputElement https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
                'maxlength': 'maxLength',
                'minlength': 'minLength',
                'formaction': 'formAction',
                'formenctype': 'formEncType',
                'formmethod': 'formMethod',
                'formnovalidate': 'formNoValidate',
                'formtarget': 'formTarget',
            };
        }
        TemplatingBindingLanguage.inject = function () {
            return [
                _index_1.Parser,
                _index_1.ObserverLocator,
                _syntax_interpreter.SyntaxInterpreter
            ];
        };
        TemplatingBindingLanguage.prototype.inspectAttribute = function (resources, attrName, attrValue) {
            var parts = attrName.split('.');
            info.defaultBindingMode = null;
            if (parts.length == 2) {
                info.attrName = parts[0].trim();
                info.attrValue = attrValue;
                info.command = parts[1].trim();
                info.expression = null;
            }
            else if (attrName == 'ref') {
                info.attrName = attrName;
                info.attrValue = attrValue;
                info.command = null;
                info.expression = new _index_1.NameExpression(attrValue, 'element');
            }
            else {
                info.attrName = attrName;
                info.attrValue = attrValue;
                info.command = null;
                info.expression = this.parseContent(resources, attrName, attrValue);
            }
            return info;
        };
        TemplatingBindingLanguage.prototype.createAttributeInstruction = function (resources, element, info, existingInstruction) {
            var instruction;
            if (info.expression) {
                if (info.attrName === 'ref') {
                    return info.expression;
                }
                instruction = existingInstruction || {
                    attrName: info.attrName,
                    attributes: {}
                };
                instruction.attributes[info.attrName] = info.expression;
            }
            else if (info.command) {
                instruction = this.syntaxInterpreter.interpret(resources, element, info, existingInstruction);
            }
            return instruction;
        };
        TemplatingBindingLanguage.prototype.parseText = function (resources, value) {
            return this.parseContent(resources, 'textContent', value);
        };
        TemplatingBindingLanguage.prototype.parseContent = function (resources, attrName, attrValue) {
            var i = attrValue.indexOf('${', 0), ii = attrValue.length, char, pos = 0, open = 0, quote = null, interpolationStart, parts, partIndex = 0;
            while (i >= 0 && i < ii - 2) {
                open = 1;
                interpolationStart = i;
                i += 2;
                do {
                    char = attrValue[i];
                    i++;
                    switch (char) {
                        case "'":
                        case '"':
                            if (quote === null) {
                                quote = char;
                            }
                            else if (quote === char) {
                                quote = null;
                            }
                            continue;
                        case '\\':
                            i++;
                            continue;
                    }
                    if (quote !== null) {
                        continue;
                    }
                    if (char === '{') {
                        open++;
                    }
                    else if (char === '}') {
                        open--;
                    }
                } while (open > 0 && i < ii);
                if (open === 0) {
                    // lazy allocate array
                    parts = parts || [];
                    if (attrValue[interpolationStart - 1] === '\\' && attrValue[interpolationStart - 2] !== '\\') {
                        // escaped interpolation
                        parts[partIndex] = attrValue.substring(pos, interpolationStart - 1) + attrValue.substring(interpolationStart, i);
                        partIndex++;
                        parts[partIndex] = this.emptyStringExpression;
                        partIndex++;
                    }
                    else {
                        // standard interpolation
                        parts[partIndex] = attrValue.substring(pos, interpolationStart);
                        partIndex++;
                        parts[partIndex] = this.parser.parse(attrValue.substring(interpolationStart + 2, i - 1));
                        partIndex++;
                    }
                    pos = i;
                    i = attrValue.indexOf('${', i);
                }
                else {
                    break;
                }
            }
            // no interpolation.
            if (partIndex === 0) {
                return null;
            }
            // literal.
            parts[partIndex] = attrValue.substr(pos);
            return new InterpolationBindingExpression(this.observerLocator, this.attributeMap[attrName] || attrName, parts, _index_1.ONE_WAY, resources.valueConverterLookupFunction, attrName);
        };
        return TemplatingBindingLanguage;
    })(_index.BindingLanguage);
    exports.TemplatingBindingLanguage = TemplatingBindingLanguage;
    var InterpolationBindingExpression = (function () {
        function InterpolationBindingExpression(observerLocator, targetProperty, parts, mode, valueConverterLookupFunction, attribute) {
            this.observerLocator = observerLocator;
            this.targetProperty = targetProperty;
            this.parts = parts;
            this.mode = mode;
            this.valueConverterLookupFunction = valueConverterLookupFunction;
            this.attribute = attribute;
            this.discrete = false;
        }
        InterpolationBindingExpression.prototype.createBinding = function (target) {
            return new InterpolationBinding(this.observerLocator, this.parts, target, this.targetProperty, this.mode, this.valueConverterLookupFunction);
        };
        return InterpolationBindingExpression;
    })();
    exports.InterpolationBindingExpression = InterpolationBindingExpression;
    var InterpolationBinding = (function () {
        function InterpolationBinding(observerLocator, parts, target, targetProperty, mode, valueConverterLookupFunction) {
            if (targetProperty === 'style') {
                logger.info('Internet Explorer does not support interpolation in "style" attributes.  Use the style attribute\'s alias, "css" instead.');
            }
            else if (target.parentElement && target.parentElement.nodeName === 'TEXTAREA' && targetProperty === 'textContent') {
                throw new Error('Interpolation binding cannot be used in the content of a textarea element.  Use <textarea value.bind="expression"></textarea> instead.');
            }
            this.observerLocator = observerLocator;
            this.parts = parts;
            this.targetProperty = observerLocator.getObserver(target, targetProperty);
            this.mode = mode;
            this.valueConverterLookupFunction = valueConverterLookupFunction;
            this.toDispose = [];
        }
        InterpolationBinding.prototype.getObserver = function (obj, propertyName) {
            return this.observerLocator.getObserver(obj, propertyName);
        };
        InterpolationBinding.prototype.bind = function (source) {
            this.source = source;
            if (this.mode == _index_1.ONE_WAY) {
                this.unbind();
                this.connect();
                this.setValue();
            }
            else {
                this.setValue();
            }
        };
        InterpolationBinding.prototype.setValue = function () {
            var value = this.interpolate();
            this.targetProperty.setValue(value);
        };
        InterpolationBinding.prototype.connect = function () {
            var _this = this;
            var info, parts = this.parts, source = this.source, toDispose = this.toDispose = [], i, ii;
            for (i = 0, ii = parts.length; i < ii; ++i) {
                if (i % 2 === 0) {
                }
                else {
                    info = parts[i].connect(this, source);
                    if (info.observer) {
                        toDispose.push(info.observer.subscribe(function (newValue) {
                            _this.setValue();
                        }));
                    }
                }
            }
        };
        InterpolationBinding.prototype.interpolate = function () {
            var value = '', parts = this.parts, source = this.source, valueConverterLookupFunction = this.valueConverterLookupFunction, i, ii, temp;
            for (i = 0, ii = parts.length; i < ii; ++i) {
                if (i % 2 === 0) {
                    value += parts[i];
                }
                else {
                    temp = parts[i].evaluate(source, valueConverterLookupFunction);
                    value += (typeof temp !== 'undefined' && temp !== null ? temp.toString() : '');
                }
            }
            return value;
        };
        InterpolationBinding.prototype.unbind = function () {
            var i, ii, toDispose = this.toDispose;
            if (toDispose) {
                for (i = 0, ii = toDispose.length; i < ii; ++i) {
                    toDispose[i]();
                }
            }
            this.toDispose = null;
        };
        return InterpolationBinding;
    })();
});

System.register(['aurelia-binding'], function(exports_1) {
    var aurelia_binding_1;
    var SyntaxInterpreter;
    return {
        setters:[
            function (_aurelia_binding_1) {
                aurelia_binding_1 = _aurelia_binding_1;
            }],
        execute: function() {
            SyntaxInterpreter = (function () {
                function SyntaxInterpreter(parser, observerLocator, eventManager) {
                    this.parser = parser;
                    this.observerLocator = observerLocator;
                    this.eventManager = eventManager;
                }
                SyntaxInterpreter.inject = function () { return [aurelia_binding_1.Parser, aurelia_binding_1.ObserverLocator, aurelia_binding_1.EventManager]; };
                SyntaxInterpreter.prototype.interpret = function (resources, element, info, existingInstruction) {
                    if (info.command in this) {
                        return this[info.command](resources, element, info, existingInstruction);
                    }
                    return this.handleUnknownCommand(resources, element, info, existingInstruction);
                };
                SyntaxInterpreter.prototype.handleUnknownCommand = function (resources, element, info, existingInstruction) {
                    var attrName = info.attrName, command = info.command;
                    var instruction = this.options(resources, element, info, existingInstruction);
                    instruction.alteredAttr = true;
                    instruction.attrName = 'global-behavior';
                    instruction.attributes.aureliaAttrName = attrName;
                    instruction.attributes.aureliaCommand = command;
                    return instruction;
                };
                SyntaxInterpreter.prototype.determineDefaultBindingMode = function (element, attrName) {
                    var tagName = element.tagName.toLowerCase();
                    if (tagName === 'input') {
                        return attrName === 'value' || attrName === 'checked' ? aurelia_binding_1.bindingMode.twoWay : aurelia_binding_1.bindingMode.oneWay;
                    }
                    else if (tagName == 'textarea' || tagName == 'select') {
                        return attrName == 'value' ? aurelia_binding_1.bindingMode.twoWay : aurelia_binding_1.bindingMode.oneWay;
                    }
                    else if (attrName === 'textcontent' || attrName === 'innerhtml') {
                        return element.contentEditable === 'true' ? aurelia_binding_1.bindingMode.twoWay : aurelia_binding_1.bindingMode.oneWay;
                    }
                    return aurelia_binding_1.bindingMode.oneWay;
                };
                SyntaxInterpreter.prototype.bind = function (resources, element, info, existingInstruction) {
                    var instruction = existingInstruction || { attrName: info.attrName, attributes: {} };
                    instruction.attributes[info.attrName] = new aurelia_binding_1.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), info.defaultBindingMode || this.determineDefaultBindingMode(element, info.attrName), resources.valueConverterLookupFunction);
                    return instruction;
                };
                SyntaxInterpreter.prototype.trigger = function (resources, element, info) {
                    return new aurelia_binding_1.ListenerExpression(this.eventManager, info.attrName, this.parser.parse(info.attrValue), false, true);
                };
                SyntaxInterpreter.prototype.delegate = function (resources, element, info) {
                    return new aurelia_binding_1.ListenerExpression(this.eventManager, info.attrName, this.parser.parse(info.attrValue), true, true);
                };
                SyntaxInterpreter.prototype.call = function (resources, element, info, existingInstruction) {
                    var instruction = existingInstruction || { attrName: info.attrName, attributes: {} };
                    instruction.attributes[info.attrName] = new aurelia_binding_1.CallExpression(this.observerLocator, info.attrName, this.parser.parse(info.attrValue), resources.valueConverterLookupFunction);
                    return instruction;
                };
                ;
                SyntaxInterpreter.prototype.options = function (resources, element, info, existingInstruction) {
                    var instruction = existingInstruction || { attrName: info.attrName, attributes: {} }, attrValue = info.attrValue, language = this.language, name = null, target = '', current, i, ii;
                    for (i = 0, ii = attrValue.length; i < ii; ++i) {
                        current = attrValue[i];
                        if (current === ';') {
                            info = language.inspectAttribute(resources, name, target.trim());
                            language.createAttributeInstruction(resources, element, info, instruction);
                            if (!instruction.attributes[info.attrName]) {
                                instruction.attributes[info.attrName] = info.attrValue;
                            }
                            target = '';
                            name = null;
                        }
                        else if (current === ':' && name === null) {
                            name = target.trim();
                            target = '';
                        }
                        else {
                            target += current;
                        }
                    }
                    if (name !== null) {
                        info = language.inspectAttribute(resources, name, target.trim());
                        language.createAttributeInstruction(resources, element, info, instruction);
                        if (!instruction.attributes[info.attrName]) {
                            instruction.attributes[info.attrName] = info.attrValue;
                        }
                    }
                    return instruction;
                };
                return SyntaxInterpreter;
            })();
            exports_1("SyntaxInterpreter", SyntaxInterpreter);
            SyntaxInterpreter.prototype['for'] = function (resources, element, info, existingInstruction) {
                var parts = info.attrValue.split(' of ');
                if (parts.length !== 2) {
                    throw new Error('Incorrect syntax for "for". The form is: "$local of $items".');
                }
                var instruction = existingInstruction || { attrName: info.attrName, attributes: {} };
                if (parts[0].match(/[[].+[,]\s.+[\]]/)) {
                    var firstPart = parts[0];
                    parts[0] = firstPart.substr(1, firstPart.indexOf(',') - 1);
                    parts.splice(1, 0, firstPart.substring(firstPart.indexOf(', ') + 2, firstPart.length - 1));
                    instruction.attributes.key = parts[0];
                    instruction.attributes.value = parts[1];
                }
                else {
                    instruction.attributes.local = parts[0];
                }
                instruction.attributes.items = new aurelia_binding_1.BindingExpression(this.observerLocator, 'items', this.parser.parse(parts[parts.length - 1]), aurelia_binding_1.bindingMode.oneWay, resources.valueConverterLookupFunction);
                return instruction;
            };
            SyntaxInterpreter.prototype['two-way'] = function (resources, element, info, existingInstruction) {
                var instruction = existingInstruction || { attrName: info.attrName, attributes: {} };
                instruction.attributes[info.attrName] = new aurelia_binding_1.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), aurelia_binding_1.bindingMode.twoWay, resources.valueConverterLookupFunction);
                return instruction;
            };
            SyntaxInterpreter.prototype['one-way'] = function (resources, element, info, existingInstruction) {
                var instruction = existingInstruction || { attrName: info.attrName, attributes: {} };
                instruction.attributes[info.attrName] = new aurelia_binding_1.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), aurelia_binding_1.bindingMode.oneWay, resources.valueConverterLookupFunction);
                return instruction;
            };
            SyntaxInterpreter.prototype['one-time'] = function (resources, element, info, existingInstruction) {
                var instruction = existingInstruction || { attrName: info.attrName, attributes: {} };
                instruction.attributes[info.attrName] = new aurelia_binding_1.BindingExpression(this.observerLocator, this.attributeMap[info.attrName] || info.attrName, this.parser.parse(info.attrValue), aurelia_binding_1.bindingMode.oneTime, resources.valueConverterLookupFunction);
                return instruction;
            };
        }
    }
});

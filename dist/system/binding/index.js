System.register(['aurelia-metadata', './value-converter', './event-manager', './observer-locator', './value-converter', './array-change-records', './binding-modes', './parser', './binding-expression', './listener-expression', './name-expression', './call-expression', './dirty-checking', './map-change-records', './computed-observation'], function(exports_1) {
    var aurelia_metadata_1, value_converter_1;
    //ES7 Decorators
    function valueConverter(nameOrTarget) {
        if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
            return function (target) {
                Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, new value_converter_1.ValueConverterResource(nameOrTarget), target);
            };
        }
        Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, new value_converter_1.ValueConverterResource(), nameOrTarget);
    }
    exports_1("valueConverter", valueConverter);
    function computedFrom() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
        return function (target, key, descriptor) {
            if (descriptor.set) {
                throw new Error("The computed property \"" + key + "\" cannot have a setter function.");
            }
            descriptor.get.dependencies = rest;
            return descriptor;
        };
    }
    exports_1("computedFrom", computedFrom);
    var exportedNames_1 = {
        'valueConverter': true,
        'computedFrom': true,
        'EventManager': true,
        'ObserverLocator': true,
        'ObjectObservationAdapter': true,
        'ValueConverterResource': true,
        'calcSplices': true,
        'Parser': true,
        'BindingExpression': true,
        'ListenerExpression': true,
        'NameExpression': true,
        'CallExpression': true,
        'DirtyChecker': true,
        'getChangeRecords': true,
        'ComputedPropertyObserver': true,
        'declarePropertyDependencies': true
    };
    function exportStar_1(m) {
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports_1(n, m[n]);
        }
    }
    return {
        setters:[
            function (_aurelia_metadata_1) {
                aurelia_metadata_1 = _aurelia_metadata_1;
            },
            function (_value_converter_1) {
                value_converter_1 = _value_converter_1;
            },
            function (_event_manager_1) {
                exports_1("EventManager", _event_manager_1["EventManager"]);
            },
            function (_observer_locator_1) {
                exports_1("ObserverLocator", _observer_locator_1["ObserverLocator"]);
                exports_1("ObjectObservationAdapter", _observer_locator_1["ObjectObservationAdapter"]);
            },
            function (_value_converter_2) {
                exports_1("ValueConverterResource", _value_converter_2["ValueConverterResource"]);
            },
            function (_array_change_records_1) {
                exports_1("calcSplices", _array_change_records_1["calcSplices"]);
            },
            function (_binding_modes_1) {
                exportStar_1(_binding_modes_1);
            },
            function (_parser_1) {
                exports_1("Parser", _parser_1["Parser"]);
            },
            function (_binding_expression_1) {
                exports_1("BindingExpression", _binding_expression_1["BindingExpression"]);
            },
            function (_listener_expression_1) {
                exports_1("ListenerExpression", _listener_expression_1["ListenerExpression"]);
            },
            function (_name_expression_1) {
                exports_1("NameExpression", _name_expression_1["NameExpression"]);
            },
            function (_call_expression_1) {
                exports_1("CallExpression", _call_expression_1["CallExpression"]);
            },
            function (_dirty_checking_1) {
                exports_1("DirtyChecker", _dirty_checking_1["DirtyChecker"]);
            },
            function (_map_change_records_1) {
                exports_1("getChangeRecords", _map_change_records_1["getChangeRecords"]);
            },
            function (_computed_observation_1) {
                exports_1("ComputedPropertyObserver", _computed_observation_1["ComputedPropertyObserver"]);
                exports_1("declarePropertyDependencies", _computed_observation_1["declarePropertyDependencies"]);
            }],
        execute: function() {
            aurelia_metadata_1.Decorators.configure.parameterizedDecorator('valueConverter', valueConverter);
        }
    }
});

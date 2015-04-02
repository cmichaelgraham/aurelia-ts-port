define(["require", "exports", '../metadata/index', './event-manager', './observer-locator', './value-converter', './array-change-records', './binding-modes', './parser', './binding-expression', './listener-expression', './name-expression', './call-expression', './dirty-checking', './map-change-records', './computed-observation'], function (require, exports, _index, _event_manager, _observer_locator, _value_converter_1, _array_change_records, _binding_modes, _parser, _binding_expression, _listener_expression, _name_expression, _call_expression, _dirty_checking, _map_change_records, _computed_observation) {
    exports.EventManager = _event_manager.EventManager;
    exports.ObserverLocator = _observer_locator.ObserverLocator;
    exports.ObjectObservationAdapter = _observer_locator.ObjectObservationAdapter;
    exports.ValueConverterResource = _value_converter_1.ValueConverterResource;
    exports.calcSplices = _array_change_records.calcSplices;
    for (var _a in _binding_modes) if (!exports.hasOwnProperty(_a)) exports[_a] = _binding_modes[_a];
    exports.Parser = _parser.Parser;
    exports.BindingExpression = _binding_expression.BindingExpression;
    exports.ListenerExpression = _listener_expression.ListenerExpression;
    exports.NameExpression = _name_expression.NameExpression;
    exports.CallExpression = _call_expression.CallExpression;
    exports.DirtyChecker = _dirty_checking.DirtyChecker;
    exports.getChangeRecords = _map_change_records.getChangeRecords;
    exports.ComputedObservationAdapter = _computed_observation.ComputedObservationAdapter;
    exports.declarePropertyDependencies = _computed_observation.declarePropertyDependencies;
    //ES7 Decorators
    function valueConverter(name) {
        return function (target) {
            _index.Metadata.on(target).add(new ValueConverterResource(name));
            return target;
        };
    }
    exports.valueConverter = valueConverter;
    _index.Decorators.configure.parameterizedDecorator('valueConverter', valueConverter);
});

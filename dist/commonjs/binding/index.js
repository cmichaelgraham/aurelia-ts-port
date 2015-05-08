function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var aurelia_metadata_1 = require('aurelia-metadata');
var value_converter_1 = require('./value-converter');
var event_manager_1 = require('./event-manager');
exports.EventManager = event_manager_1.EventManager;
var observer_locator_1 = require('./observer-locator');
exports.ObserverLocator = observer_locator_1.ObserverLocator;
exports.ObjectObservationAdapter = observer_locator_1.ObjectObservationAdapter;
var value_converter_2 = require('./value-converter');
exports.ValueConverterResource = value_converter_2.ValueConverterResource;
var array_change_records_1 = require('./array-change-records');
exports.calcSplices = array_change_records_1.calcSplices;
__export(require('./binding-modes'));
var parser_1 = require('./parser');
exports.Parser = parser_1.Parser;
var binding_expression_1 = require('./binding-expression');
exports.BindingExpression = binding_expression_1.BindingExpression;
var listener_expression_1 = require('./listener-expression');
exports.ListenerExpression = listener_expression_1.ListenerExpression;
var name_expression_1 = require('./name-expression');
exports.NameExpression = name_expression_1.NameExpression;
var call_expression_1 = require('./call-expression');
exports.CallExpression = call_expression_1.CallExpression;
var dirty_checking_1 = require('./dirty-checking');
exports.DirtyChecker = dirty_checking_1.DirtyChecker;
var map_change_records_1 = require('./map-change-records');
exports.getChangeRecords = map_change_records_1.getChangeRecords;
var computed_observation_1 = require('./computed-observation');
exports.ComputedPropertyObserver = computed_observation_1.ComputedPropertyObserver;
exports.declarePropertyDependencies = computed_observation_1.declarePropertyDependencies;
//ES7 Decorators
function valueConverter(nameOrTarget) {
    if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
        return function (target) {
            Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, new value_converter_1.ValueConverterResource(nameOrTarget), target);
        };
    }
    Reflect.defineMetadata(aurelia_metadata_1.Metadata.resource, new value_converter_1.ValueConverterResource(), nameOrTarget);
}
exports.valueConverter = valueConverter;
aurelia_metadata_1.Decorators.configure.parameterizedDecorator('valueConverter', valueConverter);
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
exports.computedFrom = computedFrom;

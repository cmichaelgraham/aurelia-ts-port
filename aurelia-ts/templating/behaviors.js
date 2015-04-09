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
define(["require", "exports", '../metadata/index', '../task-queue/index', '../binding/index', './children', './property', './util'], function (require, exports, index_1, index_2, index_3, children_1, property_1, util_1) {
    function configureBehavior(container, behavior, target, valuePropertyName) {
        var proto = target.prototype, taskQueue = container.get(index_2.TaskQueue), meta = index_1.Metadata.on(target), observerLocator = container.get(index_3.ObserverLocator), i, ii, properties;
        if (!behavior.name) {
            behavior.name = util_1.hyphenate(target.name);
        }
        behavior.target = target;
        behavior.observerLocator = observerLocator;
        behavior.handlesCreated = ('created' in proto);
        behavior.handlesBind = ('bind' in proto);
        behavior.handlesUnbind = ('unbind' in proto);
        behavior.handlesAttached = ('attached' in proto);
        behavior.handlesDetached = ('detached' in proto);
        behavior.apiName = behavior.name.replace(/-([a-z])/g, function (m, w) {
            return w.toUpperCase();
        });
        properties = meta.all(property_1.BehaviorProperty);
        for (i = 0, ii = properties.length; i < ii; ++i) {
            properties[i].define(taskQueue, behavior);
        }
        properties = behavior.properties;
        if (properties.length === 0 && 'valueChanged' in target.prototype) {
            new property_1.BehaviorProperty('value', 'valueChanged', valuePropertyName || behavior.name).define(taskQueue, behavior);
        }
        if (properties.length !== 0) {
            target.initialize = function (executionContext) {
                var observerLookup = observerLocator.getObserversLookup(executionContext), i, ii, observer;
                for (i = 0, ii = properties.length; i < ii; ++i) {
                    observer = properties[i].createObserver(executionContext);
                    if (observer !== undefined) {
                        observerLookup[observer.propertyName] = observer;
                    }
                }
            };
        }
        behavior.childExpression = meta.first(children_1.ChildObserver);
    }
    exports.configureBehavior = configureBehavior;
});

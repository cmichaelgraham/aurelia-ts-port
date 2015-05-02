define(["require", "exports", 'aurelia-metadata', 'aurelia-task-queue', 'aurelia-binding', './children', './property', './util'], function (require, exports, aurelia_metadata_1, aurelia_task_queue_1, aurelia_binding_1, children_1, property_1, util_1) {
    function configureBehavior(container, behavior, target, valuePropertyName) {
        var proto = target.prototype, taskQueue = container.get(aurelia_task_queue_1.TaskQueue), meta = aurelia_metadata_1.Metadata.on(target), observerLocator = container.get(aurelia_binding_1.ObserverLocator), i, ii, properties;
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

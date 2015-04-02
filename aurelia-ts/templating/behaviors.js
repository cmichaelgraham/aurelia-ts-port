define(["require", "exports", '../metadata/index', '../task-queue/index', '../binding/index', './children', './property', './util'], function (require, exports, _index, _index_1, _index_2, _children, _property, _util) {
    function configureBehavior(container, behavior, target, valuePropertyName) {
        var proto = target.prototype, taskQueue = container.get(_index_1.TaskQueue), meta = _index.Metadata.on(target), observerLocator = container.get(_index_2.ObserverLocator), i, ii, properties;
        if (!behavior.name) {
            behavior.name = _util.hyphenate(target.name);
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
        properties = meta.all(_property.BehaviorProperty);
        for (i = 0, ii = properties.length; i < ii; ++i) {
            properties[i].define(taskQueue, behavior);
        }
        properties = behavior.properties;
        if (properties.length === 0 && 'valueChanged' in target.prototype) {
            new _property.BehaviorProperty('value', 'valueChanged', valuePropertyName || behavior.name).define(taskQueue, behavior);
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
        behavior.childExpression = meta.first(_children.ChildObserver);
    }
    exports.configureBehavior = configureBehavior;
});

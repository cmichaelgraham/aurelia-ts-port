var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'aurelia-framework', 'aurelia-binding', 'aurelia-templating'], function (require, exports, aurelia_framework_1, aurelia_binding_1, aurelia_templating_1) {
    var Repeat = (function () {
        function Repeat(viewFactory, viewSlot, observerLocator) {
            this.viewFactory = viewFactory;
            this.viewSlot = viewSlot;
            this.observerLocator = observerLocator;
            this.local = 'item';
            this.key = 'key';
            this.value = 'value';
        }
        Repeat.prototype.bind = function (executionContext) {
            var _this = this;
            var items = this.items, observer;
            this.executionContext = executionContext;
            if (!items) {
                if (this.oldItems) {
                    this.viewSlot.removeAll();
                }
                return;
            }
            if (this.oldItems === items) {
                if (items instanceof Map) {
                    var records = aurelia_binding_1.getChangeRecords(items);
                    observer = this.observerLocator.getMapObserver(items);
                    this.handleMapChangeRecords(items, records);
                    this.disposeSubscription = observer.subscribe(function (records) {
                        _this.handleMapChangeRecords(items, records);
                    });
                }
                else {
                    var splices = aurelia_binding_1.calcSplices(items, 0, items.length, this.lastBoundItems, 0, this.lastBoundItems.length);
                    observer = this.observerLocator.getArrayObserver(items);
                    this.handleSplices(items, splices);
                    this.lastBoundItems = this.oldItems = null;
                    this.disposeSubscription = observer.subscribe(function (splices) {
                        _this.handleSplices(items, splices);
                    });
                }
            }
            else {
                this.processItems();
            }
        };
        Repeat.prototype.unbind = function () {
            this.oldItems = this.items;
            if (this.items instanceof Array) {
                this.lastBoundItems = this.items.slice(0);
            }
            if (this.disposeSubscription) {
                this.disposeSubscription();
                this.disposeSubscription = null;
            }
        };
        Repeat.prototype.itemsChanged = function () {
            this.processItems();
        };
        Repeat.prototype.processItems = function () {
            var items = this.items, viewSlot = this.viewSlot;
            if (this.disposeSubscription) {
                this.disposeSubscription();
                viewSlot.removeAll();
            }
            if (!items) {
                return;
            }
            if (items instanceof Map) {
                this.processMapEntries(items);
            }
            else {
                this.processArrayItems(items);
            }
        };
        Repeat.prototype.processArrayItems = function (items) {
            var _this = this;
            var viewFactory = this.viewFactory, viewSlot = this.viewSlot, i, ii, row, view, observer;
            observer = this.observerLocator.getArrayObserver(items);
            for (i = 0, ii = items.length; i < ii; ++i) {
                row = this.createFullExecutionContext(items[i], i, ii);
                view = viewFactory.create(row);
                viewSlot.add(view);
            }
            this.disposeSubscription = observer.subscribe(function (splices) {
                _this.handleSplices(items, splices);
            });
        };
        Repeat.prototype.processMapEntries = function (items) {
            var _this = this;
            var viewFactory = this.viewFactory, viewSlot = this.viewSlot, index = 0, row, view, observer;
            observer = this.observerLocator.getMapObserver(items);
            items.forEach(function (value, key) {
                row = _this.createFullExecutionKvpContext(key, value, index, items.size);
                view = viewFactory.create(row);
                viewSlot.add(view);
                ++index;
            });
            this.disposeSubscription = observer.subscribe(function (record) {
                _this.handleMapChangeRecords(items, record);
            });
        };
        Repeat.prototype.createBaseExecutionContext = function (data) {
            var context = {};
            context[this.local] = data;
            context.$parent = this.executionContext;
            return context;
        };
        Repeat.prototype.createBaseExecutionKvpContext = function (key, value) {
            var context = {};
            context[this.key] = key;
            context[this.value] = value;
            context.$parent = this.executionContext;
            return context;
        };
        Repeat.prototype.createFullExecutionContext = function (data, index, length) {
            var context = this.createBaseExecutionContext(data);
            return this.updateExecutionContext(context, index, length);
        };
        Repeat.prototype.createFullExecutionKvpContext = function (key, value, index, length) {
            var context = this.createBaseExecutionKvpContext(key, value);
            return this.updateExecutionContext(context, index, length);
        };
        Repeat.prototype.updateExecutionContext = function (context, index, length) {
            var first = (index === 0), last = (index === length - 1), even = index % 2 === 0;
            context.$index = index;
            context.$first = first;
            context.$last = last;
            context.$middle = !(first || last);
            context.$odd = !even;
            context.$even = even;
            return context;
        };
        Repeat.prototype.handleSplices = function (array, splices) {
            var viewLookup = new Map(), viewSlot = this.viewSlot, spliceIndexLow, view, i, ii, j, jj, row, splice, addIndex, end, itemsLeftToAdd, removed, model, children, length;
            for (i = 0, ii = splices.length; i < ii; ++i) {
                splice = splices[i];
                addIndex = splice.index;
                itemsLeftToAdd = splice.addedCount;
                end = splice.index + splice.addedCount;
                removed = splice.removed;
                if (typeof spliceIndexLow === 'undefined' || spliceIndexLow === null || spliceIndexLow > splice.index) {
                    spliceIndexLow = splice.index;
                }
                for (j = 0, jj = removed.length; j < jj; ++j) {
                    if (itemsLeftToAdd > 0) {
                        view = viewSlot.children[splice.index + j];
                        view.executionContext[this.local] = array[addIndex + j];
                        --itemsLeftToAdd;
                    }
                    else {
                        view = viewSlot.removeAt(addIndex + splice.addedCount);
                        if (view) {
                            viewLookup.set(removed[j], view);
                        }
                    }
                }
                addIndex += removed.length;
                for (; 0 < itemsLeftToAdd; ++addIndex) {
                    model = array[addIndex];
                    view = viewLookup.get(model);
                    if (view) {
                        viewLookup.delete(model);
                        viewSlot.insert(addIndex, view);
                    }
                    else {
                        row = this.createBaseExecutionContext(model);
                        view = this.viewFactory.create(row);
                        viewSlot.insert(addIndex, view);
                    }
                    --itemsLeftToAdd;
                }
            }
            children = this.viewSlot.children;
            length = children.length;
            if (spliceIndexLow > 0) {
                spliceIndexLow = spliceIndexLow - 1;
            }
            for (; spliceIndexLow < length; ++spliceIndexLow) {
                this.updateExecutionContext(children[spliceIndexLow].executionContext, spliceIndexLow, length);
            }
            viewLookup.forEach(function (x) { return x.unbind(); });
        };
        Repeat.prototype.handleMapChangeRecords = function (map, records) {
            var viewSlot = this.viewSlot, key, i, ii, view, children, length, row, removeIndex, record;
            for (i = 0, ii = records.length; i < ii; ++i) {
                record = records[i];
                key = record.key;
                switch (record.type) {
                    case 'update':
                        removeIndex = this.getViewIndexByKey(key);
                        viewSlot.removeAt(removeIndex);
                        row = this.createBaseExecutionKvpContext(key, map.get(key));
                        view = this.viewFactory.create(row);
                        viewSlot.insert(removeIndex, view);
                        break;
                    case 'add':
                        row = this.createBaseExecutionKvpContext(key, map.get(key));
                        view = this.viewFactory.create(row);
                        viewSlot.insert(map.size, view);
                        break;
                    case 'delete':
                        if (!record.oldValue) {
                            return;
                        }
                        removeIndex = this.getViewIndexByKey(key);
                        viewSlot.removeAt(removeIndex);
                        break;
                    case 'clear':
                        viewSlot.removeAll();
                }
            }
            children = viewSlot.children;
            length = children.length;
            for (i = 0; i < length; i++) {
                this.updateExecutionContext(children[i].executionContext, i, length);
            }
        };
        Repeat.prototype.getViewIndexByKey = function (key) {
            var viewSlot = this.viewSlot, i, ii, child;
            for (i = 0, ii = viewSlot.children.length; i < ii; ++i) {
                child = viewSlot.children[i];
                if (child.bindings[0].source[this.key] === key) {
                    return i;
                }
            }
        };
        Repeat = __decorate([
            aurelia_templating_1.customAttribute('repeat'),
            aurelia_templating_1.bindable('items'),
            aurelia_templating_1.bindable('local'),
            aurelia_templating_1.bindable('key'),
            aurelia_templating_1.templateController,
            aurelia_framework_1.inject(aurelia_templating_1.BoundViewFactory, aurelia_templating_1.ViewSlot, aurelia_binding_1.ObserverLocator)
        ], Repeat);
        return Repeat;
    })();
    exports.Repeat = Repeat;
});

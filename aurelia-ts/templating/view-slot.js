define(["require", "exports", './content-selector', './animator'], function (require, exports, content_selector_1, animator_1) {
    var ViewSlot = (function () {
        function ViewSlot(anchor, anchorIsContainer, executionContext, animator) {
            if (animator === void 0) { animator = animator_1.Animator.instance; }
            this.anchor = anchor;
            this.viewAddMethod = anchorIsContainer ? 'appendNodesTo' : 'insertNodesBefore';
            this.executionContext = executionContext;
            this.animator = animator;
            this.children = [];
            this.isBound = false;
            this.isAttached = false;
            anchor.viewSlot = this;
        }
        ViewSlot.prototype.transformChildNodesIntoView = function () {
            var parent = this.anchor;
            this.children.push({
                fragment: parent,
                firstChild: parent.firstChild,
                lastChild: parent.lastChild,
                removeNodes: function () {
                    var last;
                    while (last = parent.lastChild) {
                        parent.removeChild(last);
                    }
                },
                created: function () { },
                bind: function () { },
                unbind: function () { },
                attached: function () { },
                detached: function () { }
            });
        };
        ViewSlot.prototype.bind = function (executionContext) {
            var i, ii, children;
            if (this.isBound) {
                if (this.executionContext === executionContext) {
                    return;
                }
                this.unbind();
            }
            this.isBound = true;
            this.executionContext = executionContext = executionContext || this.executionContext;
            children = this.children;
            for (i = 0, ii = children.length; i < ii; ++i) {
                children[i].bind(executionContext, true);
            }
        };
        ViewSlot.prototype.unbind = function () {
            var i, ii, children = this.children;
            this.isBound = false;
            for (i = 0, ii = children.length; i < ii; ++i) {
                children[i].unbind();
            }
        };
        ViewSlot.prototype.add = function (view) {
            view[this.viewAddMethod](this.anchor);
            this.children.push(view);
            if (this.isAttached) {
                view.attached();
                // Animate page itself
                var element = view.firstChild ? view.firstChild.nextElementSibling : null;
                if (view.firstChild &&
                    view.firstChild.nodeType === 8 &&
                    element &&
                    element.nodeType === 1 &&
                    element.classList.contains('au-animate')) {
                    this.animator.enter(element);
                }
            }
        };
        ViewSlot.prototype.insert = function (index, view) {
            if ((index === 0 && !this.children.length) || index >= this.children.length) {
                this.add(view);
            }
            else {
                view.insertNodesBefore(this.children[index].firstChild);
                this.children.splice(index, 0, view);
                if (this.isAttached) {
                    view.attached();
                }
            }
        };
        ViewSlot.prototype.remove = function (view) {
            view.removeNodes();
            this.children.splice(this.children.indexOf(view), 1);
            if (this.isAttached) {
                view.detached();
            }
        };
        ViewSlot.prototype.removeAt = function (index) {
            var _this = this;
            var view = this.children[index];
            var removeAction = function () {
                view.removeNodes();
                _this.children.splice(index, 1);
                if (_this.isAttached) {
                    view.detached();
                }
                return view;
            };
            var element = view.firstChild && view.firstChild.nextElementSibling ? view.firstChild.nextElementSibling : null;
            if (view.firstChild &&
                view.firstChild.nodeType === 8 &&
                element &&
                element.nodeType === 1 &&
                element.classList.contains('au-animate')) {
                return this.animator.leave(element).then(function () {
                    return removeAction();
                });
            }
            else {
                return removeAction();
            }
        };
        ViewSlot.prototype.removeAll = function () {
            var _this = this;
            var children = this.children, ii = children.length, i;
            var rmPromises = [];
            children.forEach(function (child) {
                var element = child.firstChild ? child.firstChild.nextElementSibling : null;
                if (child.firstChild &&
                    child.firstChild.nodeType === 8 &&
                    element &&
                    element.nodeType === 1 &&
                    element.classList.contains('au-animate')) {
                    rmPromises.push(_this.animator.leave(element).then(function () {
                        child.removeNodes();
                    }));
                }
                else {
                    child.removeNodes();
                }
            });
            var removeAction = function () {
                if (_this.isAttached) {
                    for (i = 0; i < ii; ++i) {
                        children[i].detached();
                    }
                }
                _this.children = [];
            };
            if (rmPromises.length > 0) {
                return Promise.all(rmPromises).then(function () {
                    removeAction();
                });
            }
            else {
                removeAction();
            }
        };
        ViewSlot.prototype.swap = function (view) {
            var _this = this;
            var removeResponse = this.removeAll();
            if (removeResponse !== undefined) {
                removeResponse.then(function () {
                    _this.add(view);
                });
            }
            else {
                this.add(view);
            }
        };
        ViewSlot.prototype.attached = function () {
            var i, ii, children, child;
            if (this.isAttached) {
                return;
            }
            this.isAttached = true;
            children = this.children;
            for (i = 0, ii = children.length; i < ii; ++i) {
                child = children[i];
                child.attached();
                var element = child.firstChild ? child.firstChild.nextElementSibling : null;
                if (child.firstChild &&
                    child.firstChild.nodeType === 8 &&
                    element &&
                    element.nodeType === 1 &&
                    element.classList.contains('au-animate')) {
                    this.animator.enter(element);
                }
            }
        };
        ViewSlot.prototype.detached = function () {
            var i, ii, children;
            if (this.isAttached) {
                this.isAttached = false;
                children = this.children;
                for (i = 0, ii = children.length; i < ii; ++i) {
                    children[i].detached();
                }
            }
        };
        ViewSlot.prototype.installContentSelectors = function (contentSelectors) {
            this.contentSelectors = contentSelectors;
            this.add = this.contentSelectorAdd;
            this.insert = this.contentSelectorInsert;
            this.remove = this.contentSelectorRemove;
            this.removeAt = this.contentSelectorRemoveAt;
            this.removeAll = this.contentSelectorRemoveAll;
        };
        ViewSlot.prototype.contentSelectorAdd = function (view) {
            content_selector_1.ContentSelector.applySelectors(view, this.contentSelectors, function (contentSelector, group) { return contentSelector.add(group); });
            this.children.push(view);
            if (this.isAttached) {
                view.attached();
            }
        };
        ViewSlot.prototype.contentSelectorInsert = function (index, view) {
            if ((index === 0 && !this.children.length) || index >= this.children.length) {
                this.add(view);
            }
            else {
                content_selector_1.ContentSelector.applySelectors(view, this.contentSelectors, function (contentSelector, group) { return contentSelector.insert(index, group); });
                this.children.splice(index, 0, view);
                if (this.isAttached) {
                    view.attached();
                }
            }
        };
        ViewSlot.prototype.contentSelectorRemove = function (view) {
            var index = this.children.indexOf(view), contentSelectors = this.contentSelectors, i, ii;
            for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
                contentSelectors[i].removeAt(index, view.fragment);
            }
            this.children.splice(index, 1);
            if (this.isAttached) {
                view.detached();
            }
        };
        ViewSlot.prototype.contentSelectorRemoveAt = function (index) {
            var view = this.children[index], contentSelectors = this.contentSelectors, i, ii;
            for (i = 0, ii = contentSelectors.length; i < ii; ++i) {
                contentSelectors[i].removeAt(index, view.fragment);
            }
            this.children.splice(index, 1);
            if (this.isAttached) {
                view.detached();
            }
            return view;
        };
        ViewSlot.prototype.contentSelectorRemoveAll = function () {
            var children = this.children, contentSelectors = this.contentSelectors, ii = children.length, jj = contentSelectors.length, i, j, view;
            for (i = 0; i < ii; ++i) {
                view = children[i];
                for (j = 0; j < jj; ++j) {
                    contentSelectors[j].removeAt(i, view.fragment);
                }
            }
            if (this.isAttached) {
                for (i = 0; i < ii; ++i) {
                    children[i].detached();
                }
            }
            this.children = [];
        };
        return ViewSlot;
    })();
    exports.ViewSlot = ViewSlot;
});

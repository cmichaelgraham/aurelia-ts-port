//NOTE: Adding a fragment to the document causes the nodes to be removed from the fragment.
//NOTE: Adding to the fragment, causes the nodes to be removed from the document.
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
define(["require", "exports"], function (require, exports) {
    var View = (function () {
        function View(fragment, behaviors, bindings, children, systemControlled, contentSelectors) {
            this.fragment = fragment;
            this.behaviors = behaviors;
            this.bindings = bindings;
            this.children = children;
            this.systemControlled = systemControlled;
            this.contentSelectors = contentSelectors;
            this.firstChild = fragment.firstChild;
            this.lastChild = fragment.lastChild;
            this.isBound = false;
            this.isAttached = false;
        }
        View.prototype.created = function (executionContext) {
            var i, ii, behaviors = this.behaviors;
            for (i = 0, ii = behaviors.length; i < ii; ++i) {
                behaviors[i].created(executionContext);
            }
        };
        View.prototype.bind = function (executionContext, systemUpdate) {
            var context, behaviors, bindings, children, i, ii;
            if (systemUpdate && !this.systemControlled) {
                context = this.executionContext || executionContext;
            }
            else {
                context = executionContext || this.executionContext;
            }
            if (this.isBound) {
                if (this.executionContext === context) {
                    return;
                }
                this.unbind();
            }
            this.isBound = true;
            this.executionContext = context;
            if (this.owner) {
                this.owner.bind(context);
            }
            bindings = this.bindings;
            for (i = 0, ii = bindings.length; i < ii; ++i) {
                bindings[i].bind(context);
            }
            behaviors = this.behaviors;
            for (i = 0, ii = behaviors.length; i < ii; ++i) {
                behaviors[i].bind(context);
            }
            children = this.children;
            for (i = 0, ii = children.length; i < ii; ++i) {
                children[i].bind(context, true);
            }
        };
        View.prototype.addBinding = function (binding) {
            this.bindings.push(binding);
            if (this.isBound) {
                binding.bind(this.executionContext);
            }
        };
        View.prototype.unbind = function () {
            var behaviors, bindings, children, i, ii;
            if (this.isBound) {
                this.isBound = false;
                if (this.owner) {
                    this.owner.unbind();
                }
                bindings = this.bindings;
                for (i = 0, ii = bindings.length; i < ii; ++i) {
                    bindings[i].unbind();
                }
                behaviors = this.behaviors;
                for (i = 0, ii = behaviors.length; i < ii; ++i) {
                    behaviors[i].unbind();
                }
                children = this.children;
                for (i = 0, ii = children.length; i < ii; ++i) {
                    children[i].unbind();
                }
            }
        };
        View.prototype.insertNodesBefore = function (refNode) {
            var parent = refNode.parentNode;
            parent.insertBefore(this.fragment, refNode);
        };
        View.prototype.appendNodesTo = function (parent) {
            parent.appendChild(this.fragment);
        };
        View.prototype.removeNodes = function () {
            var start = this.firstChild, end = this.lastChild, fragment = this.fragment, next;
            var current = start, loop = true, nodes = [];
            while (loop) {
                if (current === end) {
                    loop = false;
                }
                next = current.nextSibling;
                this.fragment.appendChild(current);
                current = next;
            }
        };
        View.prototype.attached = function () {
            var behaviors, children, i, ii;
            if (this.isAttached) {
                return;
            }
            this.isAttached = true;
            if (this.owner) {
                this.owner.attached();
            }
            behaviors = this.behaviors;
            for (i = 0, ii = behaviors.length; i < ii; ++i) {
                behaviors[i].attached();
            }
            children = this.children;
            for (i = 0, ii = children.length; i < ii; ++i) {
                children[i].attached();
            }
        };
        View.prototype.detached = function () {
            var behaviors, children, i, ii;
            if (this.isAttached) {
                this.isAttached = false;
                if (this.owner) {
                    this.owner.detached();
                }
                behaviors = this.behaviors;
                for (i = 0, ii = behaviors.length; i < ii; ++i) {
                    behaviors[i].detached();
                }
                children = this.children;
                for (i = 0, ii = children.length; i < ii; ++i) {
                    children[i].detached();
                }
            }
        };
        return View;
    })();
    exports.View = View;
});

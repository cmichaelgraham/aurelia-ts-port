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
define(["require", "exports", './navigation-commands'], function (require, exports, navigation_commands_1) {
    exports.NO_CHANGE = 'no-change';
    exports.INVOKE_LIFECYCLE = 'invoke-lifecycle';
    exports.REPLACE = 'replace';
    function buildNavigationPlan(navigationContext, forceLifecycleMinimum) {
        var prev = navigationContext.prevInstruction;
        var next = navigationContext.nextInstruction;
        var plan = {}, viewPortName;
        if (prev) {
            var newParams = hasDifferentParameterValues(prev, next);
            var pending = [];
            for (viewPortName in prev.viewPortInstructions) {
                var prevViewPortInstruction = prev.viewPortInstructions[viewPortName];
                var nextViewPortConfig = next.config.viewPorts[viewPortName];
                var viewPortPlan = plan[viewPortName] = {
                    name: viewPortName,
                    config: nextViewPortConfig,
                    prevComponent: prevViewPortInstruction.component,
                    prevModuleId: prevViewPortInstruction.moduleId
                };
                if (prevViewPortInstruction.moduleId != nextViewPortConfig.moduleId) {
                    viewPortPlan.strategy = exports.REPLACE;
                }
                else if ('determineActivationStrategy' in prevViewPortInstruction.component.executionContext) {
                    //TODO: should we tell them if the parent had a lifecycle min change?
                    viewPortPlan.strategy = (_a = prevViewPortInstruction.component.executionContext).determineActivationStrategy.apply(_a, next.lifecycleArgs);
                }
                else if (newParams || forceLifecycleMinimum) {
                    viewPortPlan.strategy = exports.INVOKE_LIFECYCLE;
                }
                else {
                    viewPortPlan.strategy = exports.NO_CHANGE;
                }
                if (viewPortPlan.strategy !== exports.REPLACE && prevViewPortInstruction.childRouter) {
                    var path = next.getWildcardPath();
                    var task = prevViewPortInstruction.childRouter
                        .createNavigationInstruction(path, next).then(function (childInstruction) {
                        viewPortPlan.childNavigationContext = prevViewPortInstruction.childRouter
                            .createNavigationContext(childInstruction);
                        return buildNavigationPlan(viewPortPlan.childNavigationContext, viewPortPlan.strategy == exports.INVOKE_LIFECYCLE)
                            .then(function (childPlan) {
                            viewPortPlan.childNavigationContext.plan = childPlan;
                        });
                    });
                    pending.push(task);
                }
            }
            return Promise.all(pending).then(function () { return plan; });
        }
        else {
            for (viewPortName in next.config.viewPorts) {
                plan[viewPortName] = {
                    name: viewPortName,
                    strategy: exports.REPLACE,
                    config: next.config.viewPorts[viewPortName]
                };
            }
            return Promise.resolve(plan);
        }
        var _a;
    }
    exports.buildNavigationPlan = buildNavigationPlan;
    var BuildNavigationPlanStep = (function () {
        function BuildNavigationPlanStep() {
        }
        BuildNavigationPlanStep.prototype.run = function (navigationContext, next) {
            if (navigationContext.nextInstruction.config.redirect) {
                return next.cancel(new navigation_commands_1.Redirect(navigationContext.nextInstruction.config.redirect));
            }
            return buildNavigationPlan(navigationContext)
                .then(function (plan) {
                navigationContext.plan = plan;
                return next();
            }).catch(next.cancel);
        };
        return BuildNavigationPlanStep;
    })();
    exports.BuildNavigationPlanStep = BuildNavigationPlanStep;
    function hasDifferentParameterValues(prev, next) {
        var prevParams = prev.params, nextParams = next.params, nextWildCardName = next.config.hasChildRouter ? next.getWildCardName() : null;
        for (var key in nextParams) {
            if (key == nextWildCardName) {
                continue;
            }
            if (prevParams[key] != nextParams[key]) {
                return true;
            }
        }
        return false;
    }
});

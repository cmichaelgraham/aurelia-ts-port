var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports"], function (require, exports) {
    function createResult(ctx, next) {
        return {
            status: next.status,
            context: ctx,
            output: next.output,
            completed: next.status == exports.COMPLETED
        };
    }
    exports.COMPLETED = 'completed';
    exports.CANCELLED = 'cancelled';
    exports.REJECTED = 'rejected';
    exports.RUNNING = 'running';
    var Pipeline = (function () {
        function Pipeline() {
            this.steps = [];
        }
        Pipeline.prototype.withStep = function (step) {
            var run, steps, i, l;
            if (typeof step == 'function') {
                run = step;
            }
            else if (step.isMultiStep) {
                steps = step.getSteps();
                for (i = 0, l = steps.length; i < l; i++) {
                    this.withStep(steps[i]);
                }
                return this;
            }
            else {
                run = step.run.bind(step);
            }
            this.steps.push(run);
            return this;
        };
        Pipeline.prototype.run = function (ctx) {
            var index = -1, steps = this.steps, next, currentStep;
            next = function () {
                index++;
                if (index < steps.length) {
                    currentStep = steps[index];
                    try {
                        return currentStep(ctx, next);
                    }
                    catch (e) {
                        return next.reject(e);
                    }
                }
                else {
                    return next.complete();
                }
            };
            next.complete = function (output) {
                next.status = exports.COMPLETED;
                next.output = output;
                return Promise.resolve(createResult(ctx, next));
            };
            next.cancel = function (reason) {
                next.status = exports.CANCELLED;
                next.output = reason;
                return Promise.resolve(createResult(ctx, next));
            };
            next.reject = function (error) {
                next.status = exports.REJECTED;
                next.output = error;
                return Promise.reject(createResult(ctx, next));
            };
            next.status = exports.RUNNING;
            return next();
        };
        return Pipeline;
    })();
    exports.Pipeline = Pipeline;
});

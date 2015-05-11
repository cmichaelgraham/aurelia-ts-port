System.register([], function(exports_1) {
    var pipelineStatus, Pipeline;
    function createResult(ctx, next) {
        return {
            status: next.status,
            context: ctx,
            output: next.output,
            completed: next.status == pipelineStatus.completed
        };
    }
    return {
        setters:[],
        execute: function() {
            exports_1("pipelineStatus", pipelineStatus = {
                completed: 'completed',
                cancelled: 'cancelled',
                rejected: 'rejected',
                running: 'running'
            });
            Pipeline = (function () {
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
                        next.status = pipelineStatus.completed;
                        next.output = output;
                        return Promise.resolve(createResult(ctx, next));
                    };
                    next.cancel = function (reason) {
                        next.status = pipelineStatus.cancelled;
                        next.output = reason;
                        return Promise.resolve(createResult(ctx, next));
                    };
                    next.reject = function (error) {
                        next.status = pipelineStatus.rejected;
                        next.output = error;
                        return Promise.resolve(createResult(ctx, next));
                    };
                    next.status = pipelineStatus.running;
                    return next();
                };
                return Pipeline;
            })();
            exports_1("Pipeline", Pipeline);
        }
    }
});

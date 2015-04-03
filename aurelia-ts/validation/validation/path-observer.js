define(["require", "exports"], function (require, exports) {
    var PathObserver = (function () {
        function PathObserver(observerLocator, subject, path) {
            this.observerLocator = observerLocator;
            this.path = path.split('.');
            this.subject = subject;
            this.observers = [];
            this.callbacks = [];
            if (this.path.length > 1)
                this.observeParts();
            //TODO: this should be replaced with reuse of the Binding system
        }
        PathObserver.prototype.observeParts = function (propertyName) {
            var _this = this;
            //remove old chain until an observer returns non-null
            if (propertyName !== undefined && propertyName !== null) {
                for (var i = this.observers.length - 1; i >= 0; i--) {
                    var currentObserver = this.observers[i];
                    if (currentObserver.propertyName === propertyName) {
                        break;
                    }
                    var observer = this.observers.pop();
                    if (observer && observer.subscription) {
                        //cleanup
                        observer.subscription();
                    }
                }
            }
            var currentSubject = this.subject;
            //add new observers
            var observersAreComplete = this.observers.length === this.path.length;
            for (var _i = 0; _i < this.path.length; _i++) {
                var _observer = this.observers[_i];
                if (!_observer) {
                    var currentPath = this.path[_i];
                    _observer = this.observerLocator.getObserver(currentSubject, currentPath);
                    this.observers.push(_observer);
                    var subscription = _observer.subscribe(function (newValue, oldValue) {
                        _this.observeParts(_observer.propertyName);
                    });
                    _observer.subscription = subscription;
                }
                var currentValue = _observer.getValue();
                if (currentValue === undefined || currentValue === null) {
                    break;
                }
                else {
                    currentSubject = currentValue;
                }
            }
            //if the last observer is the real one
            if (!observersAreComplete && this.observers.length === this.path.length) {
                var actualObserver = this.observers[this.observers.length - 1];
                for (var _i_1 = 0; _i_1 < this.callbacks.length; _i_1++) {
                    //TODO proper cleanup of callbacks!
                    actualObserver.subscribe(this.callbacks[_i_1]);
                }
            }
        };
        PathObserver.prototype.observePart = function (part) {
            if (part !== this.path[this.path.length - 1]) {
                this.observerParts();
            }
        };
        PathObserver.prototype.getObserver = function () {
            if (this.path.length == 1)
                return this.observerLocator.getObserver(this.subject, this.path[0]);
            return this;
        };
        PathObserver.prototype.getValue = function () {
            //Verify that all observers are current.
            var expectedSubject = this.subject;
            for (var i = 0; this.path.length; i++) {
                var currentObserver = this.observers[i];
                if (currentObserver === null || currentObserver === undefined) {
                    this.observeParts(this.path[i]);
                    currentObserver = this.observers[i];
                    if (currentObserver === null || currentObserver === undefined) {
                        break;
                    }
                }
                if (currentObserver.obj !== expectedSubject) 
                //Happens if you set a value somewhere along the binding path and immediately call getValue (on the very last observer)
                {
                    this.observeParts(this.path[i - 1]);
                    break;
                }
                expectedSubject = currentObserver.getValue();
            }
            if (this.observers.length !== this.path.length)
                return undefined; //Something along the binding path returned null/undefined
            var value = this.observers[this.observers.length - 1].getValue();
            return value;
        };
        PathObserver.prototype.subscribe = function (callback) {
            this.callbacks.unshift(callback);
            if (this.observers.length === this.path.length) {
                return this.observers[this.observers.length - 1].subscribe(callback);
            }
            //TODO proper cleanup of callbacks
        };
        return PathObserver;
    })();
    exports.PathObserver = PathObserver;
});

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
    function processPotential(obj, resolve, reject) {
        if (obj && typeof obj.then === 'function') {
            var dfd = obj.then(resolve);
            if (typeof dfd.catch === 'function') {
                return dfd.catch(reject);
            }
            else if (typeof dfd.fail === 'function') {
                return dfd.fail(reject);
            }
            return dfd;
        }
        else {
            try {
                return resolve(obj);
            }
            catch (error) {
                return reject(error);
            }
        }
    }
    exports.processPotential = processPotential;
});

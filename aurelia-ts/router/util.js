var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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

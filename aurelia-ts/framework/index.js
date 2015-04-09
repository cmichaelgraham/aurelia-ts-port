/**
 * The aurelia framework brings together all the required core aurelia libraries into a ready-to-go application-building platform.
 *
 * @module framework
 */
var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", './aurelia', '../dependency-injection/index', '../binding/index', '../metadata/index', '../templating/index', '../loader/index', '../task-queue/index', '../logging/index'], function (require, exports, aurelia_1, index_1, index_2, index_3, index_4, index_5, index_6, TheLogManager) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.Aurelia = aurelia_1.Aurelia;
    __export(index_1);
    __export(index_2);
    __export(index_3);
    __export(index_4);
    __export(index_5);
    __export(index_6);
    exports.LogManager = TheLogManager;
});

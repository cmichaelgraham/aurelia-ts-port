define(["require", "exports"], function (require, exports) {
    function install(aurelia) {
        aurelia.globalizeResources('./hello-world');
    }
    exports.install = install;
});

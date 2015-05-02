define(["require", "exports"], function (require, exports) {
    function configure(aurelia) {
        aurelia.globalizeResources('./hello-world');
    }
    exports.configure = configure;
});

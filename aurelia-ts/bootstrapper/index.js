var __decorate = this.__decorate || (typeof Reflect === "object" && Reflect.decorate) || function (decorators, target, key, desc) {
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", '../framework/index', '../logging-console/index'], function (require, exports, index_1, index_2) {
    var logger = index_1.LogManager.getLogger('bootstrapper');
    var readyQueue = [];
    var isReady = false;
    function onReady(callback) {
        return new Promise(function (resolve, reject) {
            if (!isReady) {
                readyQueue.push(function () {
                    try {
                        resolve(callback());
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            else {
                resolve(callback());
            }
        });
    }
    function bootstrap(configure) {
        return onReady(function () {
            var loader = new window.AureliaLoader(), aurelia = new index_1.Aurelia(loader);
            return configureAurelia(aurelia).then(function () { return configure(aurelia); });
        });
    }
    exports.bootstrap = bootstrap;
    function ready(global) {
        return new Promise(function (resolve, reject) {
            if (global.document.readyState === "complete") {
                resolve(global.document);
            }
            else {
                global.document.addEventListener("DOMContentLoaded", completed, false);
                global.addEventListener("load", completed, false);
            }
            function completed() {
                global.document.removeEventListener("DOMContentLoaded", completed, false);
                global.removeEventListener("load", completed, false);
                resolve(global.document);
            }
        });
    }
    function ensureLoader() {
        if (!window.AureliaLoader) {
            return window.System.normalize('aurelia-bootstrapper').then(function (bootstrapperName) {
                return window.System.normalize('aurelia-loader-default', bootstrapperName).then(function (loaderName) {
                    return window.System.import(loaderName);
                });
            });
        }
        return Promise.resolve();
    }
    function preparePlatform() {
        return window.System.normalize('aurelia-bootstrapper').then(function (bootstrapperName) {
            return window.System.normalize('aurelia-framework', bootstrapperName).then(function (frameworkName) {
                window.System.map['aurelia-framework'] = frameworkName;
                return window.System.normalize('aurelia-loader', frameworkName).then(function (loaderName) {
                    var toLoad = [];
                    if (!window.System.polyfilled) {
                        logger.debug('loading core-js');
                        toLoad.push(window.System.normalize('core-js', loaderName).then(function (name) {
                            return window.System.import(name);
                        }));
                    }
                    toLoad.push(window.System.normalize('aurelia-depedency-injection', frameworkName).then(function (name) {
                        window.System.map['aurelia-depedency-injection'] = name;
                    }));
                    toLoad.push(window.System.normalize('aurelia-router', bootstrapperName).then(function (name) {
                        window.System.map['aurelia-router'] = name;
                    }));
                    toLoad.push(window.System.normalize('aurelia-logging-console', bootstrapperName).then(function (name) {
                        window.System.map['aurelia-logging-console'] = name;
                    }));
                    if (!('import' in document.createElement('link'))) {
                        logger.debug('loading the HTMLImports polyfill');
                        toLoad.push(window.System.normalize('webcomponentsjs/HTMLImports.min', loaderName).then(function (name) {
                            return window.System.import(name);
                        }));
                    }
                    if (!("content" in document.createElement("template"))) {
                        logger.debug('loading the HTMLTemplateElement polyfill');
                        toLoad.push(window.System.normalize('aurelia-html-template-element', loaderName).then(function (name) {
                            return window.System.import(name);
                        }));
                    }
                    return Promise.all(toLoad);
                });
            });
        });
    }
    var installedDevelopmentLogging = false;
    function configureAurelia(aurelia) {
        return window.System.normalize('aurelia-bootstrapper').then(function (bName) {
            var toLoad = [];
            toLoad.push(window.System.normalize('aurelia-templating-binding', bName).then(function (templatingBinding) {
                aurelia.use.defaultBindingLanguage = function () {
                    aurelia.use.plugin(templatingBinding);
                    return this;
                };
            }));
            toLoad.push(window.System.normalize('aurelia-history-browser', bName).then(function (historyBrowser) {
                return window.System.normalize('aurelia-templating-router', bName).then(function (templatingRouter) {
                    aurelia.use.router = function () {
                        aurelia.use.plugin(historyBrowser);
                        aurelia.use.plugin(templatingRouter);
                        return this;
                    };
                });
            }));
            toLoad.push(window.System.normalize('aurelia-templating-resources', bName).then(function (name) {
                window.System.map['aurelia-templating-resources'] = name;
                aurelia.use.defaultResources = function () {
                    aurelia.use.plugin(name);
                    return this;
                };
            }));
            toLoad.push(window.System.normalize('aurelia-event-aggregator', bName).then(function (eventAggregator) {
                window.System.map['aurelia-event-aggregator'] = eventAggregator;
                aurelia.use.eventAggregator = function () {
                    aurelia.use.plugin(eventAggregator);
                    return this;
                };
            }));
            aurelia.use.standardConfiguration = function () {
                aurelia.use
                    .defaultBindingLanguage()
                    .defaultResources()
                    .router()
                    .eventAggregator();
                return this;
            };
            aurelia.use.developmentLogging = function () {
                if (!installedDevelopmentLogging) {
                    installedDevelopmentLogging = true;
                    index_1.LogManager.addAppender(new index_2.ConsoleAppender());
                    index_1.LogManager.setLevel(index_1.LogManager.levels.debug);
                }
                return this;
            };
            return Promise.all(toLoad);
        });
    }
    function runningLocally() {
        return window.location.protocol !== 'http' && window.location.protocol !== 'https';
    }
    function handleApp(appHost) {
        var configModuleId = appHost.getAttribute('aurelia-app'), aurelia, loader;
        if (configModuleId) {
            loader = new window.AureliaLoader();
            return loader.loadModule(configModuleId)
                .then(function (m) {
                aurelia = new index_1.Aurelia(loader);
                return configureAurelia(aurelia).then(function () { return m.configure(aurelia); });
            }).catch(function (e) {
                setTimeout(function () { throw e; }, 0);
            });
        }
        else {
            aurelia = new index_1.Aurelia();
            return configureAurelia(aurelia).then(function () {
                if (runningLocally()) {
                    aurelia.use.developmentLogging();
                }
                aurelia.use.standardConfiguration();
                if (appHost.hasAttribute('es5')) {
                    aurelia.use.es5();
                }
                return aurelia.start().then(function (a) { return a.setRoot(undefined, appHost); });
            }).catch(function (e) {
                setTimeout(function () { throw e; }, 0);
            });
        }
    }
    function run() {
        return ready(window).then(function (doc) {
            var appHost = doc.querySelectorAll("[aurelia-app]");
            return ensureLoader().then(function () {
                return preparePlatform().then(function () {
                    var i, ii;
                    for (i = 0, ii = appHost.length; i < ii; ++i) {
                        handleApp(appHost[i]);
                    }
                    isReady = true;
                    for (i = 0, ii = readyQueue.length; i < ii; ++i) {
                        readyQueue[i]();
                    }
                    readyQueue = [];
                });
            });
        });
    }
    run();
});

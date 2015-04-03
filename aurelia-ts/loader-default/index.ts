import {Origin} from '../metadata/index';
import {Loader} from '../loader/index';

declare var require: any;
declare var define: any;

if(!(<any>window).System || !(<any>window).System.import){
  var sys = (<any>window).System = (<any>window).System || {};

  sys.polyfilled = true;
  sys.map = {};

  sys['import'] = function(moduleId){
    return new Promise((resolve, reject) => {
      require([moduleId], resolve, reject);
    });
  };

  sys.normalize = function(url){
    return Promise.resolve(url);
  };
}

function ensureOriginOnExports(executed, name){
  var target = executed,
      key, exportedValue;

  if(target.__useDefault){
    target = target['default'];
  }

  Origin.set(target, new Origin(name, 'default'));

  for (key in target) {
    exportedValue = target[key];

    if (typeof exportedValue === "function") {
      Origin.set(exportedValue, new Origin(name, key));
    }
  }

  return executed;
}

export class DefaultLoader extends Loader {
  public moduleRegistry;
  constructor(){
    super();

    this.moduleRegistry = {};
    var that = this;

    if((<any>window).System.polyfilled){
      define('view', [], {
        'load': function (name, req, onload, config) {
          var entry = that.getOrCreateTemplateRegistryEntry(name),
              address;

          if(entry.templateIsLoaded){
            onload(entry);
            return;
          }

          address = req.toUrl(name);

          that.importTemplate(address).then(template => {
            entry.setTemplate(template);
            onload(entry);
          });
        }
      });
    }else{
      (<any>window).System.set('view', (<any>window).System.newModule({
        'fetch': function(load, fetch):any {
          var id = load.name.substring(0, load.name.indexOf('!'));
          var entry = load.metadata.templateRegistryEntry = that.getOrCreateTemplateRegistryEntry(id);

          if(entry.templateIsLoaded){
            return '';
          }

          return that.importTemplate(load.address).then(template => {
            entry.setTemplate(template);
            return '';
          });
        },
        'instantiate':function(load) {
          return load.metadata.templateRegistryEntry;
        }
      }));
    }
  }

  loadModule(id){
    return (<any>window).System.normalize(id).then(newId => {
      var existing = this.moduleRegistry[newId];
      if(existing){
        return existing;
      }

      return (<any>window).System.import(newId).then(m => {
        this.moduleRegistry[newId] = m;
        return ensureOriginOnExports(m, newId);
      });
    });
  }

  loadAllModules(ids){
    var loads = [];

    for(let id of ids){
      loads.push(this.loadModule(id));
    }

    return Promise.all(loads);
  }

  loadTemplate(url){
    if((<any>window).System.polyfilled){
      return (<any>window).System.import('view!' + url);
    }else{
      return (<any>window).System.import(url + '!view');
    }
  }
}

(<any>window).AureliaLoader = DefaultLoader;

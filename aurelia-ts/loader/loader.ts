import {TemplateRegistryEntry} from './template-registry-entry';

declare var HTMLTemplateElement:any;

var hasTemplateElement = ('content' in document.createElement('template'));

function importElements(frag, link, callback) {
  document.head.appendChild(frag);

  if((<any>window).Polymer && (<any>window).Polymer.whenReady){
    (<any>window).Polymer.whenReady(callback);
  }else{
    link.addEventListener('load', callback);
  }
}

export class Loader {
  public templateRegistry;
  constructor(){
    this.templateRegistry = {};
  }

  loadModule(id){
    throw new Error('Loaders must implement loadModule(id).');
  }

  loadAllModules(ids){
    throw new Error('Loader must implement loadAllModules(ids).');
  }

  loadTemplate(url){
    throw new Error('Loader must implement loadTemplate(url).');
  }

  getOrCreateTemplateRegistryEntry(id){
    var entry = this.templateRegistry[id];

    if(entry === undefined){
      this.templateRegistry[id] = entry = new TemplateRegistryEntry(id);
    }

    return entry;
  }

  importDocument(url){
    return new Promise((resolve, reject) => {
      var frag = document.createDocumentFragment();
      var link = document.createElement('link');

      link.rel = 'import';
      link.href = url;
      frag.appendChild(link);

      importElements(frag, link, () => resolve((<any>link).import));
    });
  }

  importTemplate(url){
    return this.importDocument(url).then(doc => {
      return this.findTemplate(doc, url);
    });
  }

  findTemplate(doc, url){
    if(!hasTemplateElement){
      HTMLTemplateElement.bootstrap(doc);
    }

    var template = doc.getElementsByTagName('template')[0];

    if(!template){
      throw new Error(`There was no template element found in '${url}'.`);
    }

    return template;
  }
}

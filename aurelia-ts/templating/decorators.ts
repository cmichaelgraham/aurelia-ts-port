import core from 'core-js';
import {Metadata, Decorators} from 'aurelia-metadata';
import {BindableProperty} from './bindable-property';
import {ChildObserver} from './children';
import {ElementConfigResource} from './element-config';
import {ViewStrategy, UseViewStrategy, NoViewStrategy} from './view-strategy';
import {HtmlBehaviorResource} from './html-behavior';

export function behavior(override):any{
  return function(target){
    if(override instanceof HtmlBehaviorResource){
      Reflect.defineMetadata(Metadata.resource, override, target);
    }else{
      var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
      Object.assign(resource, override);
    }
  }
}

Decorators.configure.parameterizedDecorator('behavior', behavior);

export function customElement(name):any{
  return function(target){
    var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
    resource.elementName = name;
  }
}

Decorators.configure.parameterizedDecorator('customElement', customElement);

export function customAttribute(name):any{
  return function(target){
    var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
    resource.attributeName = name;
  }
}

Decorators.configure.parameterizedDecorator('customAttribute', customAttribute);

export function templateController(target?):any{
  var deco = function(target){
    var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
    resource.liftsContent = true;
  };

  return target ? deco(target) : deco;
}

Decorators.configure.simpleDecorator('templateController', templateController);

export function bindable(nameOrConfigOrTarget, key?, descriptor?):any{
  var deco = function(target, key, descriptor){
    var actualTarget = key ? target.constructor : target, //is it on a property or a class?
    resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, actualTarget),
        prop;

    if(key){ //is it on a property or a class?
      nameOrConfigOrTarget = nameOrConfigOrTarget || {};
      nameOrConfigOrTarget.name = key;
    }

    prop = new BindableProperty(nameOrConfigOrTarget);
    return prop.registerWith(actualTarget, resource, descriptor);
  };

  if(!nameOrConfigOrTarget){ //placed on property initializer with parens
    return deco;
  }

  if(key){ //placed on a property initializer without parens
    var target = nameOrConfigOrTarget;
    nameOrConfigOrTarget = null;
    return deco(target, key, descriptor);
  }

  return deco; //placed on a class
}

Decorators.configure.parameterizedDecorator('bindable', bindable);

export function dynamicOptions(target?):any{
  var deco = function(target){
    var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
    resource.hasDynamicOptions = true;
  };

  return target ? deco(target) : deco;
}

Decorators.configure.simpleDecorator('dynamicOptions', dynamicOptions);

export function syncChildren(property, changeHandler, selector):any{
  return function(target){
    var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
    resource.childExpression = new ChildObserver(property, changeHandler, selector);
  }
}

Decorators.configure.parameterizedDecorator('syncChildren', syncChildren);

export function useShadowDOM(target):any{
  var deco = function(target){
    var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
    resource.targetShadowDOM = true;
  };

  return target ? deco(target) : deco;
}

Decorators.configure.simpleDecorator('useShadowDOM', useShadowDOM);

export function skipContentProcessing(target):any{
  var deco = function(target){
    var resource = Metadata.getOrCreateOwn(Metadata.resource, HtmlBehaviorResource, target);
    resource.skipContentProcessing = true;
  };

  return target ? deco(target) : deco;
}

Decorators.configure.simpleDecorator('skipContentProcessing', skipContentProcessing);

export function viewStrategy(strategy):any{
  return function(target){
    Reflect.defineMetadata(ViewStrategy.metadataKey, strategy, target);
  }
}

Decorators.configure.parameterizedDecorator('viewStrategy', useView);

export function useView(path):any{
  return viewStrategy(new UseViewStrategy(path));
}

Decorators.configure.parameterizedDecorator('useView', useView);

export function noView(target?):any{
  var deco = function(target){
    Reflect.defineMetadata(ViewStrategy.metadataKey, new NoViewStrategy(), target);
  };

  return target ? deco(target) : deco;
}

Decorators.configure.simpleDecorator('noView', noView);

export function elementConfig(target):any{
  var deco = function(target){
    Reflect.defineMetadata(Metadata.resource, new ElementConfigResource(), target);
  };

  return target ? deco(target) : deco;
}

Decorators.configure.simpleDecorator('elementConfig', elementConfig);

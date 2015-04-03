import {Container} from '../dependency-injection/index';
import {ViewSlot, ViewStrategy} from '../templating/index';
import {Router} from '../router/index';
import {Metadata, Origin} from '../metadata/index';

export class RouterView {
  static metadata(){ return Metadata.customElement('router-view').noView(); }
  static inject() { return [Element,Container,ViewSlot,Router]; }
  constructor(element, container, viewSlot, router) {
    this.element = element;
    this.container = container;
    this.viewSlot = viewSlot;
    this.router = router;
    router.registerViewPort(this, element.getAttribute('name'));
  }

  process(viewPortInstruction, waitToSwap) {
    var component = viewPortInstruction.component,
        viewStrategy = component.view,
        childContainer = component.childContainer,
        viewModel = component.executionContext,
        viewModelResource = component.viewModelResource,
        metadata = viewModelResource.metadata;

    if(!viewStrategy && 'getViewStrategy' in viewModel){
      viewStrategy = viewModel.getViewStrategy();
    }

    if(viewStrategy){
      viewStrategy = ViewStrategy.normalize(viewStrategy);
      viewStrategy.makeRelativeTo(Origin.get(component.router.container.viewModel.constructor).moduleId);
    }

    return metadata.load(childContainer, viewModelResource.value, viewStrategy, true).then(viewFactory => {
      viewPortInstruction.behavior = metadata.create(childContainer, {
        executionContext:viewModel,
        viewFactory:viewFactory,
        suppressBind:true
      });

      if(waitToSwap){
        return;
      }

      this.swap(viewPortInstruction);
    });
  }

  swap(viewPortInstruction){
    viewPortInstruction.behavior.view.bind(viewPortInstruction.behavior.executionContext);
    this.viewSlot.swap(viewPortInstruction.behavior.view);

    if(this.view){
      this.view.unbind();
    }

    this.view = viewPortInstruction.behavior.view;
  }
}

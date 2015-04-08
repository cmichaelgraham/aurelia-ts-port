import {Container, inject} from '../dependency-injection/index';
import {
  CompositionEngine, ViewSlot, ViewResources,
  customElement, bindable, noView
} from '../templating/index';

@customElement('compose')
@bindable('model')
@bindable('view')
@bindable('viewModel')
@noView
@inject(Container, CompositionEngine, ViewSlot, ViewResources)
export class Compose {
  public container;
  public compositionEngine;
  public viewSlot;
  public viewResources;
  public executionContext;
  public currentViewModel;
  public view;
  public viewModel;
  public model;
	constructor(container, compositionEngine, viewSlot, viewResources){
		this.container = container;
		this.compositionEngine = compositionEngine;
		this.viewSlot = viewSlot;
    this.viewResources = viewResources;
	}

	bind(executionContext){
		this.executionContext = executionContext;
		processInstruction(this, { view:this.view, viewModel:this.viewModel, model:this.model });
	}

	modelChanged(newValue, oldValue){
    var vm = this.currentViewModel;

		if(vm && typeof vm.activate === 'function'){
      vm.activate(newValue);
		}
  }

  viewChanged(newValue, oldValue){
  	processInstruction(this, { view:newValue, viewModel:this.currentViewModel || this.viewModel, model:this.model });
  }

  viewModelChanged(newValue, oldValue){
  	processInstruction(this, { viewModel:newValue, view:this.view, model:this.model });
  }
}

function processInstruction(composer, instruction){
  composer.compositionEngine.compose(Object.assign(instruction, {
    executionContext:composer.executionContext,
    container:composer.container,
    viewSlot:composer.viewSlot,
    viewResources:composer.viewResources,
    currentBehavior:composer.currentBehavior
  })).then(next => {
    composer.currentBehavior = next;
    composer.currentViewModel = next ? next.executionContext : null;
  });
}

import {BoundViewFactory, ViewSlot, customAttribute, templateController} from '../templating/index';
import {inject} from '../dependency-injection/index';

@customAttribute('if')
@templateController
@inject(BoundViewFactory, ViewSlot)export class If {
  public viewFactory;
  public viewSlot;
  public showing;
  public view;
  constructor(viewFactory, viewSlot){
    this.viewFactory = viewFactory;
    this.viewSlot = viewSlot;
    this.showing = false;
  }

  valueChanged(newValue){
    if (!newValue) {
      if(this.view){
        this.viewSlot.remove(this.view);
        this.view.unbind();
      }

      this.showing = false;
      return;
    }

    if(!this.view){
      this.view = this.viewFactory.create();
    }

    if (!this.showing) {
      this.showing = true;

      if(!this.view.bound){
        this.view.bind();
      }

      this.viewSlot.add(this.view);
    }
  }
}

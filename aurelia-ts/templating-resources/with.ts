import {inject} from '../dependency-injection/index';
import {BoundViewFactory, ViewSlot, customAttribute, templateController} from '../templating/index';

@customAttribute('with')
@templateController
@inject(BoundViewFactory, ViewSlot)
export class With {
  public viewFactory;
  public viewSlot;
  public view;
  constructor(viewFactory, viewSlot){
    this.viewFactory = viewFactory;
    this.viewSlot = viewSlot;
  }

  valueChanged(newValue){
    if(!this.view){
      this.view = this.viewFactory.create(newValue);
      this.viewSlot.add(this.view);
    }else{
      this.view.bind(newValue);
    }
  }
}

import {inject} from '../dependency-injection/index';
import {customAttribute} from '../templating/index';

function addStyleString(str) {
  var node = document.createElement('style');
  node.innerHTML = str;
  node.type = 'text/css';
  document.head.appendChild(node);
}

addStyleString('.aurelia-hide { display:none !important; }');

@customAttribute('show')
@inject(Element)
export class Show {
  public element;
  constructor(element) {
    this.element = element;
  }

  valueChanged(newValue){
    if (newValue) {
      this.element.classList.remove('aurelia-hide');
    } else {
      this.element.classList.add('aurelia-hide');
    }
  }
}

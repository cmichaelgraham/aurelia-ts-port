import {ResourceType} from '../metadata/index';
import {EventManager} from '../binding/index';

export class ElementConfig extends ResourceType {
  load(container, target){
    var config = new target(),
        eventManager = container.get(EventManager);

    eventManager.registerElementConfig(config);
  }

  register(){}
}

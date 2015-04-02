import nprogress from 'nprogress';
import {Behavior} from '../framework/index';

export class LoadingIndicator {
  static metadata(){
    return Behavior
      .customElement('loading-indicator')
      .withProperty('loading')
      .noView();
  };

  loadingChanged(newValue){
    if(newValue){
      nprogress.start();
    }else{
      nprogress.done();
    }
  }
}

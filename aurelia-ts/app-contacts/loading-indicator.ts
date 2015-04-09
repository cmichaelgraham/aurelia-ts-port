import nprogress from 'nprogress';
import {bindable, noView} from '../framework/index';

@bindable('loading')
@noView
export class LoadingIndicator {
  loadingChanged(newValue){
    if(newValue){
      nprogress.start();
    }else{
      nprogress.done();
    }
  }
}

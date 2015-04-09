import {inject} from '../framework/index'
import {Router} from '../router/index';

@inject(Router)
export class ChildRouter{
  static inject() { return [Router]; }
  public heading = 'Child Router';
  public router;
  constructor(router){
    this.router = router;
    router.configure(config => {
      config.map([
        { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
        { route: 'flickr',        moduleId: './flickr',       nav: true },
        { route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' }
      ]);
    });
  }
}

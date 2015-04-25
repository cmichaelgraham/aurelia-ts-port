import {Router} from 'aurelia-router';

export class ChildRouter{
  public router:Router;
  configureRouter(config, router){
    this.router = router;

    config.map([
      { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
      { route: 'flickr',        moduleId: './flickr',       nav: true },
      { route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' }
    ]);
  }
}

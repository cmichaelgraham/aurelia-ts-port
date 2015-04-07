import {inject} from '../framework/index'
import {Router} from '../router/index';
import {WebAPI} from './web-api';

@inject(Router, WebAPI)
export class App {
  public router;
  public api;
  constructor(router, api) {
    this.router = router;
    this.api = api;

    this.router.configure(config => {
      config.title = 'Contacts';
      config.map([
        { route: '',              moduleId: 'no-selection',   title: 'Select'},
        { route: 'contacts/:id',  moduleId: 'contact-detail' }
      ]);
    });
  }
}

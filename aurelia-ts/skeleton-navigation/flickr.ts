import {inject} from '../framework/index'
import {HttpClient} from '../http-client/index';

@inject(HttpClient)
export class Flickr{
  static inject() { return [HttpClient]; }
  public heading;
  public images;
  public http;
  public url;
  constructor(http){
    this.heading = 'Flickr';
    this.images = [];
    this.http = http;
  }

  activate(){
    return this.http.jsonp(this.url).then(response => {
      this.images = response.content.items;
    });
  }

  canDeactivate(){
    return confirm('Are you sure you want to leave?');
  }
}

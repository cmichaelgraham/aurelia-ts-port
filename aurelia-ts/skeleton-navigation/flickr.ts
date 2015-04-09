import {inject} from '../framework/index'
import {HttpClient} from '../http-client/index';

@inject(HttpClient)
export class Flickr{
  static inject() { return [HttpClient]; }
  public heading = 'Flickr';
  public images = [];
  public http;
  public url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=rainier&tagmode=any&format=json';
  constructor(http){
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

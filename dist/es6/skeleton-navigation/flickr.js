var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
export let Flickr = class {
    constructor(http) {
        this.heading = 'Flickr';
        this.images = [];
        this.url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=mountain&tagmode=any&format=json';
        this.http = http;
    }
    activate() {
        return this.http.jsonp(this.url).then(response => {
            this.images = response.content.items;
        });
    }
    canDeactivate() {
        return confirm('Are you sure you want to leave?');
    }
};
Flickr = __decorate([
    inject(HttpClient), 
    __metadata('design:paramtypes', [Object])
], Flickr);

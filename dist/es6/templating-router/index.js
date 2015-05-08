import { Router, AppRouter, RouteLoader } from 'aurelia-router';
import { TemplatingRouteLoader } from './route-loader';
export function configure(aurelia) {
    aurelia.withSingleton(RouteLoader, TemplatingRouteLoader)
        .withSingleton(Router, AppRouter)
        .globalizeResources('./router-view', './route-href');
}
export { TemplatingRouteLoader } from './route-loader';
export { RouterView } from './router-view';
export { RouteHref } from './route-href';

declare module 'aurelia-route-recognizer/dsl' {
	export function map(callback: any, addRouteCallback: any): void;

}
declare module 'aurelia-route-recognizer' {
	import main = require('aurelia-route-recognizer/index');
	export = main;
}

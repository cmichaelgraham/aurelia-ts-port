declare module 'aurelia-path/index' {
	export function relativeToFile(name: any, file: any): any;
	export function join(path1: any, path2: any): any;
	export function buildQueryString(a: any, traditional?: any): string;

}
declare module 'aurelia-path' {
	import main = require('aurelia-path/index');
	export = main;
}

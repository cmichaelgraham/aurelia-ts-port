declare module 'aurelia-bootstrapper/index' {
	export function bootstrap(configure: any): Promise<{}>;

}
declare module 'aurelia-bootstrapper' {
	import main = require('aurelia-bootstrapper/index');
	export = main;
}

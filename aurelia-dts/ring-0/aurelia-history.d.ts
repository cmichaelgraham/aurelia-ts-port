declare module 'aurelia-history/index' {
	export class History {
	    activate(): void;
	    deactivate(): void;
	    navigate(): void;
	    navigateBack(): void;
	}

}
declare module 'aurelia-history' {
	import main = require('aurelia-history/index');
	export = main;
}

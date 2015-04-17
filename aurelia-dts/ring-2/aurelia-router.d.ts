declare module 'aurelia-router/navigation-commands' {
	/**
	 * Determines if the provided object is a navigation command.
	 * A navigation command is anything with a navigate method.
	 * @param {object} obj The item to check.
	 * @return {boolean}
	 */
	export function isNavigationCommand(obj: any): boolean;
	/**
	* Used during the activation lifecycle to cause a redirect.
	*
	* @class Redirect
	* @constructor
	* @param {String} url The url to redirect to.
	*/
	export class Redirect {
	    url: any;
	    options: any;
	    shouldContinueProcessing: any;
	    router: any;
	    constructor(url: any, options?: any);
	    /**
	    * Called by the activation system to set the child router.
	    *
	    * @method setRouter
	    * @param {Router} router
	    */
	    setRouter(router: any): void;
	    /**
	    * Called by the navigation pipeline to navigate.
	    *
	    * @method navigate
	    * @param {Router} appRouter - a router which should redirect
	    */
	    navigate(appRouter: any): void;
	}

}
declare module 'aurelia-router/navigation-plan' {
	export var NO_CHANGE: string;
	export var INVOKE_LIFECYCLE: string;
	export var REPLACE: string;
	export function buildNavigationPlan(navigationContext: any, forceLifecycleMinimum?: any): Promise<{}>;
	export class BuildNavigationPlanStep {
	    run(navigationContext: any, next: any): any;
	}

}
declare module 'aurelia-router/util' {
	export function processPotential(obj: any, resolve: any, reject: any): any;

}
declare module 'aurelia-router/activation' {
	export var affirmations: string[];
	export class CanDeactivatePreviousStep {
	    run(navigationContext: any, next: any): any;
	}
	export class CanActivateNextStep {
	    run(navigationContext: any, next: any): any;
	}
	export class DeactivatePreviousStep {
	    run(navigationContext: any, next: any): any;
	}
	export class ActivateNextStep {
	    run(navigationContext: any, next: any): any;
	}

}
declare module 'aurelia-router/navigation-context' {
	export class NavigationContext {
	    router: any;
	    nextInstruction: any;
	    currentInstruction: any;
	    prevInstruction: any;
	    plan: any;
	    constructor(router: any, nextInstruction: any);
	    getAllContexts(acc?: any[]): any[];
	    nextInstructions: any[];
	    currentInstructions: any[];
	    prevInstructions: any[];
	    commitChanges(waitToSwap: any): Promise<void>;
	    buildTitle(separator?: string): any;
	}
	export class CommitChangesStep {
	    run(navigationContext: any, next: any): any;
	}

}
declare module 'aurelia-router/navigation-instruction' {
	export class NavigationInstruction {
	    fragment: any;
	    queryString: any;
	    params: any;
	    queryParams: any;
	    config: any;
	    lifecycleArgs: any;
	    viewPortInstructions: any;
	    constructor(fragment: any, queryString: any, params: any, queryParams: any, config: any, parentInstruction: any);
	    addViewPortInstruction(viewPortName: any, strategy: any, moduleId: any, component: any): {
	        name: any;
	        strategy: any;
	        moduleId: any;
	        component: any;
	        childRouter: any;
	        lifecycleArgs: any;
	    };
	    getWildCardName(): any;
	    getWildcardPath(): any;
	    getBaseUrl(): any;
	}

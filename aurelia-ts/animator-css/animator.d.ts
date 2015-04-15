export declare class CssAnimator {
    animationStack: any;
    constructor();
    addMultipleEventListener(el: any, s: any, fn: any, b: any): void;
    addAnimationToStack(animId: any): void;
    removeAnimationFromStack(animId: any): void;
    move(): Promise<boolean>;
    enter(element: any): Promise<{}>;
    leave(element: any): Promise<{}>;
    removeClass(element: any, className: any): Promise<{}>;
    addClass(element: any, className: any): Promise<{}>;
}

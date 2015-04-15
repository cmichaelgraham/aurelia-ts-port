export declare class Animator {
    static instance: any;
    static configureDefault(container: any, animatorInstance?: any): void;
    move(): Promise<boolean>;
    enter(element: any): Promise<boolean>;
    leave(element: any): Promise<boolean>;
    removeClass(element: any, className: any): Promise<boolean>;
    addClass(element: any, className: any): Promise<boolean>;
}

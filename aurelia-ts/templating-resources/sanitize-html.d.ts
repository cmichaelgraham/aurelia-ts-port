export declare class SanitizeHtmlValueConverter {
    static defaultSanitizer(untrustedMarkup: any): any;
    sanitizer: any;
    constructor();
    toView(untrustedMarkup: any): any;
}

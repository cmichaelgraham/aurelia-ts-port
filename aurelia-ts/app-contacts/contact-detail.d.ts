export declare class ContactDetail {
    app: any;
    api: any;
    ea: any;
    contact: any;
    originalContact: any;
    constructor(app: any, api: any, ea: any);
    activate(params: any, qs: any, config: any): any;
    canSave: boolean;
    save(): void;
    canDeactivate(): boolean;
}

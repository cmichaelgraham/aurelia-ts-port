export declare class WebAPI {
    isRequesting: any;
    getContactList(): Promise<{}>;
    getContactDetails(id: any): Promise<{}>;
    saveContact(contact: any): Promise<{}>;
}
